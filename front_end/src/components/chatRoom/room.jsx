import React, { useEffect, useState, useRef } from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiPaperClip } from "react-icons/hi2";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { io } from "socket.io-client";
import useUser from "../../context/user.jsx";
import { BsChatLeftFill } from "react-icons/bs";
import { BsChatRightFill } from "react-icons/bs";
import MessageTBox from "./otherMessageBox.jsx";
import { IoMdSend } from "react-icons/io";
import ReplyBox from "./replyBox.jsx";
import { FiUpload } from "react-icons/fi";
import ShowFiles from "./showSelectedFile.jsx";
import axios from "axios"
import dayjs from "dayjs"
import Spinner from "../spinner.jsx";
import { HiMiniXMark } from "react-icons/hi2";
import useAttachedFile from "../../context/attachementSelected.jsx";
function Room() {
    const { attachedFile, setAttachedFile } = useAttachedFile();

    const [Message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const { user } = useUser();
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null); // To scroll to the end of the messages container
    const [selectedFile, setSelectedFile] = useState([]);
    const [files, setfiles] = useState(null);
    const [displayFile, setdisplayFile] = useState(null);
    const [isFileRenderingComplete, setIsFileRenderingComplete] = useState(true);
    const [runSpinner, setrunSpinner] = useState(false)
    const [cross, setcross] = useState(false);
    const formatTime12Hour = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };


    const crossClicked = () => {

        setSelectedFile([]);
        setfiles(null);
        setcross(false);
        setAttachedFile({
            filestoDisplay: null,
            files: null,
            chatId: null,
        });
        console.log("This is the cross", cross)
    }

    const handleFileChange = (e) => {
        e.preventDefault();
        setcross(!cross)
        const fileList = e.target.files;
        console.log('file list ', fileList)
        setfiles(fileList)
        const filesArray = Array.from(fileList); // Convert to an array
        setSelectedFile(filesArray);

    };


    useEffect(() => {
        const socketInstance = io("http://localhost:8000");
        socketRef.current = socketInstance;

        const userId = user?.data?.user?._id;
        if (userId) {
            socketInstance.emit("joinChat", { _id: userId });


            socketInstance.on("chatHistory", (messages) => {
                setChatHistory(messages);
            });

            // Listen for new chat messages
            socketInstance.on("chat", ({ message, sender, createdAt, _id }) => {
                setChatHistory((prev) => [...prev, { message, sender, createdAt, _id }]);
            });


            // Listen for new file messages
            socketInstance.on("file", ({ fileLink, fileType, sender, createdAt, _id }) => {
                // console.log("This  is the chat history ", chatHistory)
                setChatHistory((prev) => [...prev, { fileLink, fileType, sender, createdAt, _id }]);
            });
        } else {
            console.error("User ID is missing!");
        }


        return () => {
            socketInstance.disconnect();
        };
    }, [user]);


    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log(Message)
        const socketInstance = socketRef.current;
        const userId = user?.data?.user?._id;
        if (socketInstance && Message.trim()) {

            socketInstance.emit("chat", { userId, message: Message });

            setMessage("");
        } else {
            console.error("Message is empty or socket not connected.");
        }
    };


    const handleFileUpload = async (e) => {
        e.preventDefault();
        setcross(false)
        setrunSpinner(true)
        setIsFileRenderingComplete(false);

        console.log("clicked file UPload")

        const userId = user?.data?.user?._id;
        const sender = user?.data?.user?.username;
        const Room = user?.data?.user?.collegeInfo?.collegeName;

        try {
            const formData = new FormData();

            if (files) {
                console.log('selected one ', files)
                Array.from(files).forEach((file) => {
                    formData.append("fileLink", file);
                });
            }

            formData.append("room", Room);
            formData.append("sentBy", userId);
            formData.append("sender", sender);

            const response = await axios.post(
                "http://localhost:8000/api/v1/users/fileUpload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.status === 200) {
                console.log("ya this is the response  ", response)



                const filesArray = Array.from(response?.data?.data); // Convert to an array
                setdisplayFile(filesArray)

                setSelectedFile([]); // Reset selected files
                setfiles(null); // Clear files
            }
        } catch (error) {
            console.error("Error while uploading files:", error);
        } finally {
            setIsFileRenderingComplete(true); // Re-enable upload button
            setSelectedFile([]);
            setfiles(null);
            setrunSpinner(false)
        }
    };

    const handleFileAttachmentUpload = async (e) => {

        e.preventDefault();
        setcross(false)
        setrunSpinner(true)
        setIsFileRenderingComplete(false);
        console.log("clicked file attachment UPload")

        const userId = user?.data?.user?._id;
        const sender = user?.data?.user?.username;
        const Room = user?.data?.user?.collegeInfo?.collegeName;

        try {
            const formData = new FormData();
            if (files) {
                console.log('selected one ', files)
                Array.from(files).forEach((file) => {
                    formData.append("fileLink", file);
                });
            }

            formData.append("room", Room);
            formData.append("sentBy", userId);
            formData.append("sender", sender);
            formData.append("chatId", attachedFile.chatId);

            const response = await axios.post(
                "http://localhost:8000/api/v1/users/uploadAttachment",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )

            if (response.status === 200) {
                console.log("ya this is the response  ", response)



                // const filesArray = Array.from(response?.data?.data);
                // setdisplayFile(filesArray)

                setSelectedFile([]);
                setfiles(null);


            }
        }
        catch (err) {
            console.error("Error while uploading attachment files:", err);
        }
        finally {
            setIsFileRenderingComplete(true);
            setSelectedFile([]);
            setfiles(null);
            setrunSpinner(false)
            setAttachedFile({
                filestoDisplay: null,
                files: null,
                chatId: null,
            });
        }
    }
    useEffect(() => {
        const socketInstance = socketRef.current;
        if (socketInstance && displayFile) {
            const userId = user?.data?.user?._id;
            // Rendering starts, disable the button
            // Emit each file to the socket
            displayFile.map((file, index) => {

                socketInstance.emit("file", { userId, fileLink: file.fileLink, fileType: file.fileType, createdAt: file.createdAt, chatId: file._id });
            });
            setTimeout(() => {
                setIsFileRenderingComplete(true);
            }, 100);
            setdisplayFile(null);
        } else {
            console.error("Message is empty or socket not connected.");
        }
    }, [displayFile]);


    useEffect(() => {

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory]);


    useEffect(() => {
        // console.log(attachedFile)
        if (attachedFile && attachedFile.filestoDisplay) {
            console.log("inside use")
            setSelectedFile(attachedFile.filestoDisplay)
            setfiles(attachedFile.files)
            setcross(true)
        }
    }, [attachedFile])
    return (
        <div>
            <div className="w-[400px]  bg-violet-700 rounded-lg border-2 h-1/4 border-menuItem shadow-2xl shadow-menuItem">
                <div className=" flex">
                    <div className="flex flex-col h-[45px] w-[400px] justify-center">
                        <h1 className="text-white font-baloo text-center text-2xl mt-3">Doubt room</h1>
                    </div>

                </div>
                <hr className="mt-1" />

                <div className="text-gray-400 flex">
                    <h3>Online</h3>
                </div>


                <div className=" w-[400px] h-[450px] overflow-y-auto px-3 py-2 bg-slate-800  2/4">
                    {
                        runSpinner && <div className="absolute left-[200px]">

                            <Spinner color="blue-200" />

                        </div>
                    }


                    {chatHistory.map((payload, index) => {
                        // console.log(payload.timestamp)
                        return (

                            <div key={index}>
                                {
                                    !payload.fileLink
                                        ?

                                        <div >
                                            {
                                                (payload.sender === user?.data?.user?.username) ? (
                                                    <div
                                                        key={index}
                                                    >
                                                        {<ReplyBox message={payload.message} timestamp={formatTime12Hour(payload.createdAt)} sender='you' />}
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={index}
                                                        className="mb-2"
                                                    >
                                                        {<MessageTBox message={payload.message} timestamp={formatTime12Hour(payload.createdAt)} sender={payload.sender} chatId={payload._id} />}
                                                    </div>
                                                )
                                            }
                                        </div>

                                        :

                                        <div >
                                            {
                                                (payload.sender === user?.data?.user?.username)
                                                    ?
                                                    (
                                                        <div
                                                            key={index}
                                                        >
                                                            {<ReplyBox fileLink={payload.fileLink} fileType={payload.fileType} timestamp={formatTime12Hour(payload.createdAt)} sender='you' />}
                                                        </div>
                                                    ) :
                                                    (
                                                        <div
                                                            key={index}
                                                            className="mb-2"
                                                        >
                                                            {<MessageTBox fileLink={payload.fileLink} fileType={payload.fileType} timestamp={formatTime12Hour(payload.createdAt)} sender={payload.sender} />}
                                                        </div>
                                                    )
                                            }
                                        </div>
                                }
                            </div>)
                    })}

                    {
                        (setfiles && cross) && <div
                            onClick={crossClicked}
                            className="absolute flex left-[190px] border bg-gray-400 w-[50px] h-[50px] items-center justify-center rounded-full bottom-[100px] hover:bg-gray-300 ">

                            <HiMiniXMark className="text-white text-3xl" />
                        </div>
                    }

                    <div ref={messagesEndRef} />
                </div>


                <div className="flex justify-center items-center  h-1/4">
                    <label
                        htmlFor="room-file-upload"
                    >
                        <HiPaperClip
                            className={`text-white rounded ml-1 items-center bg-menuItem w-[30px] h-[65px] 
                                ${(!attachedFile.filestoDisplay && isFileRenderingComplete) ? 'hover:text-gray-200' : 'opacity-50 cursor-not-allowed'}`}

                        />
                    </label>
                    <input
                        id="room-file-upload"
                        name="file-upload"
                        accept=".pdf, image/*, video/*"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={!attachedFile.filestoDisplay && isFileRenderingComplete ? handleFileChange : null}
                        disabled={attachedFile.filestoDisplay || !isFileRenderingComplete}
                    />



                    {
                        selectedFile && selectedFile.length == 0
                            ?
                            <>

                                <textarea
                                    placeholder="Ask Question"
                                    className="min-w-[320px] max-w-[320px] h-auto max-h-[100px]  rounded-r text-center outline-none p-2 resize-none overflow-y-auto break-words"
                                    value={Message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <IoMdSend
                                    className="text-white bg-purple-950 w-[40px] h-[65px] hover:text-gray-300"
                                    onClick={handleSendMessage}
                                />
                            </>

                            :
                            <>
                                <div
                                    className="h-[65px] w-[350px]  bg-white overflow-y-scroll"
                                >
                                    {
                                        selectedFile && selectedFile.length > 0 && (
                                            <div className=" flex flex-wrap mt-1 justify-center bg-white overflow-y-scroll">
                                                {selectedFile.map((file, index) => (
                                                    <ShowFiles index={index} filePath={file} />
                                                ))}
                                            </div>
                                        )
                                    }

                                </div>
                                <FiUpload
                                    className={`text-white bg-purple-950 w-[40px] h-[65px] ${isFileRenderingComplete ? 'hover:text-gray-300' : 'opacity-50 cursor-not-allowed'}`}
                                    onClick={isFileRenderingComplete ?
                                        (attachedFile.filestoDisplay ? handleFileAttachmentUpload : handleFileUpload)
                                        : null}
                                />
                            </>

                    }

                </div>

            </div >
        </div >
    );
}

export default Room;

