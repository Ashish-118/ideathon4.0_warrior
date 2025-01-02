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
function Room() {
    const [Message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const { user } = useUser();
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null); // To scroll to the end of the messages container
    const [selectedFile, setSelectedFile] = useState([]);
    const [files, setfiles] = useState(null);
    const [displayFile, setdisplayFile] = useState(null);
    const [isFileRenderingComplete, setIsFileRenderingComplete] = useState(true);


    const handleFileChange = (e) => {
        e.preventDefault();
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
            socketInstance.on("chat", ({ message, sender, timestamp, chatId }) => {
                setChatHistory((prev) => [...prev, { message, sender, timestamp, chatId }]);
            });


            // Listen for new file messages
            socketInstance.on("file", ({ fileLink, fileType, sender, timestamp }) => {
                console.log("This  is the chat history ", chatHistory)
                setChatHistory((prev) => [...prev, { fileLink, fileType, sender, timestamp }]);
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
        setIsFileRenderingComplete(false); // Disable upload button during upload
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
                // Emit socket event for each uploaded file
                // const uploadedFiles = response?.data?.data || [];
                // console.log('after uploading  ', uploadedFiles)
                // uploadedFiles.forEach((file) => {
                //     console.log('inside uploading emit')
                //     socketInstance.emit("file", {
                //         userId,
                //         fileLink: file.fileLink,

                //     });

                // });


                const filesArray = Array.from(response?.data?.data); // Convert to an array
                setdisplayFile(filesArray)

                setSelectedFile([]); // Reset selected files
                setfiles(null); // Clear files
            }
        } catch (error) {
            console.error("Error while uploading files:", error);
        } finally {
            setIsFileRenderingComplete(true); // Re-enable upload button
        }
    };


    useEffect(() => {
        const socketInstance = socketRef.current;
        if (socketInstance && displayFile) {
            const userId = user?.data?.user?._id;
            // Rendering starts, disable the button
            // Emit each file to the socket
            displayFile.map((file, index) => {
                socketInstance.emit("file", { userId, fileLink: file.fileLink, fileType: file.fileType });
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

    return (
        <div>
            <div className="w-[400px]  bg-violet-700 rounded-lg border-2 h-1/4 border-menuItem shadow-2xl shadow-menuItem">
                <div className="flex flex-col h-[45px] w-[400px] justify-center">
                    <h1 className="text-white font-baloo text-center text-2xl mt-3">Doubt room</h1>
                    <hr className="mt-1" />
                </div>

                <div className="text-gray-400 flex">
                    <h3>Online</h3>
                </div>


                <div className=" w-[400px] h-[450px] overflow-y-auto px-3 py-2 bg-slate-800  2/4">

                    {chatHistory.map((payload, index) => {
                        const time12Hour = dayjs(payload.timestamp).format("hh:mm A");

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
                                                        {<ReplyBox message={payload.message} timestamp={time12Hour} sender='you' />}
                                                    </div>
                                                ) : (
                                                    <div
                                                        key={index}
                                                        className="mb-2"
                                                    >
                                                        {<MessageTBox message={payload.message} timestamp={time12Hour} sender={payload.sender} />}
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
                                                            {<ReplyBox fileLink={payload.fileLink} fileType={payload.fileType} timestamp={time12Hour} sender='you' />}
                                                        </div>
                                                    ) :
                                                    (
                                                        <div
                                                            key={index}
                                                            className="mb-2"
                                                        >
                                                            {<MessageTBox fileLink={payload.fileLink} fileType={payload.fileType} timestamp={time12Hour} sender={payload.sender} />}
                                                        </div>
                                                    )
                                            }
                                        </div>
                                }
                            </div>)
                    })}

                    <div ref={messagesEndRef} />
                </div>


                <div className="flex justify-center items-center  h-1/4">
                    <label
                        htmlFor="file-upload"
                    >
                        <HiPaperClip
                            className="text-white rounded ml-1 items-center bg-menuItem w-[30px] h-[65px] hover:text-gray-200"
                        />
                    </label>
                    <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={handleFileChange}
                    />


                    {
                        selectedFile.length == 0
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
                                        selectedFile.length > 0 && (
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
                                    onClick={isFileRenderingComplete ? handleFileUpload : null}
                                />
                            </>

                    }

                </div>

            </div >
        </div >
    );
}

export default Room;



// ----->



// import React, { useEffect, useState, useRef } from "react";
// import { HiOutlineArrowCircleRight } from "react-icons/hi";
// import { HiPaperClip } from "react-icons/hi2";
// import { IoMdSend } from "react-icons/io";
// import { FiUpload } from "react-icons/fi";
// import { io } from "socket.io-client";
// import axios from "axios";
// import useUser from "../../context/user.jsx";
// import ReplyBox from "./replyBox.jsx";
// import MessageTBox from "./otherMessageBox.jsx";
// import ShowFiles from "./showSelectedFile.jsx";

// function Room() {
//     const [Message, setMessage] = useState("");
//     const [chatHistory, setChatHistory] = useState([]);
//     const { user } = useUser();
//     const socketRef = useRef(null);
//     const messagesEndRef = useRef(null);
//     const [selectedFile, setSelectedFile] = useState([]);
//     const [files, setFiles] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);

//     const handleFileChange = (e) => {
//         const fileList = Array.from(e.target.files);
//         setSelectedFile(fileList);
//         setFiles(fileList);
//     };

//     useEffect(() => {
//         const socketInstance = io("http://localhost:8000");
//         socketRef.current = socketInstance;

//         const userId = user?.data?.user?._id;
//         if (userId) {
//             socketInstance.emit("joinChat", { _id: userId });

//             socketInstance.on("chatHistory", (messages) => {
//                 setChatHistory(messages);
//             });

//             socketInstance.on("chat", (newMessage) => {
//                 setChatHistory((prev) => [...prev, newMessage]);
//             });

//             socketInstance.on("file", (newFileMessage) => {
//                 setChatHistory((prev) => [...prev, newFileMessage]);
//             });
//         }

//         return () => {
//             socketInstance.disconnect();
//         };
//     }, [user]);

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         const socketInstance = socketRef.current;
//         const userId = user?.data?.user?._id;

//         if (socketInstance && Message.trim()) {
//             socketInstance.emit("chat", { userId, message: Message });
//             setMessage("");
//         }
//     };

//     const handleFileUpload = async (e) => {
//         e.preventDefault();
//         setIsUploading(true);
//         const userId = user?.data?.user?._id;
//         const sender = user?.data?.user?.username;
//         const room = user?.data?.user?.collegeInfo?.collegeName;

//         try {
//             const formData = new FormData();
//             files.forEach((file) => formData.append("fileLink", file));
//             formData.append("room", room);
//             formData.append("sentBy", userId);
//             formData.append("sender", sender);

//             const response = await axios.post("http://localhost:8000/api/v1/users/fileUpload", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             if (response.status === 200) {
//                 const uploadedFiles = response?.data?.data || [];
//                 const socketInstance = socketRef.current;

//                 uploadedFiles.forEach((file) => {
//                     socketInstance.emit("file", {
//                         userId,
//                         fileLink: file.fileLink,
//                         fileName: file.fileName,
//                         fileType: file.fileType,
//                     });
//                 });

//                 setSelectedFile([]);
//                 setFiles(null);
//             }
//         } catch (error) {
//             console.error("Error uploading file:", error);
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [chatHistory]);

//     return (
//         <div>
//             <div className="w-[400px] bg-violet-700 rounded-lg border-2 h-1/4 border-menuItem shadow-2xl shadow-menuItem">

//                 <div className="flex flex-col h-[45px] w-[400px] justify-center">
//                     <h1 className="text-white font-baloo text-center text-2xl mt-3">Doubt Room</h1>
//                     <hr className="mt-1" />
//                 </div>

//                 <div className="w-[400px] h-[450px] overflow-y-auto px-3 py-2 bg-slate-800  2/4 z-0">
//                     {chatHistory.map((payload, index) => (
//                         <div key={index}>
//                             {!payload.fileLink ? (
//                                 payload.sender === user?.data?.user?.username ? (
//                                     <ReplyBox message={payload.message} sender="you" />
//                                 ) : (
//                                     <MessageTBox message={payload.message} sender={payload.sender} />
//                                 )
//                             ) : payload.sender === user?.data?.user?.username ? (
//                                 <ReplyBox file={payload} sender="you" />
//                             ) : (
//                                 <MessageTBox file={payload} sender={payload.sender} />
//                             )}
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 <div className="flex justify-center items-center h-1/4">
//                     <label htmlFor="file-upload">
//                         <HiPaperClip className="text-white rounded ml-1 items-center bg-menuItem w-[30px] h-[65px] hover:text-gray-200" />
//                     </label>
//                     <input
//                         id="file-upload"
//                         type="file"
//                         multiple
//                         className="sr-only"
//                         onChange={handleFileChange}
//                     />
//                     {selectedFile.length === 0 ? (
//                         <>
//                             <textarea
//                                 placeholder="Ask Question"
//                                 className="min-w-[320px] max-w-[320px] h-auto max-h-[100px] rounded-r text-center outline-none p-2 resize-none overflow-y-auto break-words"
//                                 value={Message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                             />
//                             <IoMdSend className="text-white bg-purple-950 w-[40px] h-[65px] hover:text-gray-300" onClick={handleSendMessage} />
//                         </>
//                     ) : (
//                         <>
//                             {/* flex flex-wrap mt-1 justify-center bg-white overflow-y-scroll */}
//                             <div className="h-[65px] w-[350px]  bg-white overflow-y-scroll">
//                                 <div className="flex flex-wrap mt-1 justify-center bg-white overflow-y-scroll">
//                                     {selectedFile.map((file, index) => (
//                                         <ShowFiles key={index} index={index} filePath={file} />
//                                     ))}
//                                 </div>

//                             </div>
//                             <FiUpload
//                                 className={`text-white bg-purple-950 w-[40px] h-[65px] ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:text-gray-300"
//                                     }`}
//                                 onClick={isUploading ? null : handleFileUpload}
//                             />
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Room;
