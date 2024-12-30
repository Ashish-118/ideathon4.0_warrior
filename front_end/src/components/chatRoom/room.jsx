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

function Room() {
    const [Message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const { user } = useUser();
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null); // To scroll to the end of the messages container
    const [selectedFile, setSelectedFile] = useState([]);


    const handleFileChange = (e) => {
        e.preventDefault();
        const fileList = e.target.files; // FileList object
        const filesArray = Array.from(fileList); // Convert to an array
        setSelectedFile(filesArray);
        console.log("Selected files:", filesArray);
    };


    useEffect(() => {
        const socketInstance = io("http://localhost:8000");
        socketRef.current = socketInstance;

        const userId = user?.data?.user?._id;
        if (userId) {
            socketInstance.emit("joinChat", { _id: userId });

            // Listen for chat history
            socketInstance.on("chatHistory", (messages) => {
                setChatHistory(messages);
            });

            // Listen for new chat messages
            socketInstance.on("chat", ({ message, sender, timestamp, chatId }) => {
                setChatHistory((prev) => [...prev, { message, sender, timestamp, chatId }]);
            });
        } else {
            console.error("User ID is missing!");
        }

        // Cleanup on component unmount
        return () => {
            socketInstance.disconnect();
        };
    }, [user]);


    const handleSendMessage = (e) => {
        e.preventDefault();

        const socketInstance = socketRef.current;
        const userId = user?.data?.user?._id;
        if (socketInstance && Message.trim()) {

            socketInstance.emit("chat", { userId, message: Message });

            setMessage("");
        } else {
            console.error("Message is empty or socket not connected.");
        }
    };

    // Scroll to bottom of the chat when new message is added
    useEffect(() => {
        // Scroll to the bottom if the user is at the bottom of the chat
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

                    {chatHistory.map((payload, index) => (


                        <div className="">
                            {payload.sender === user?.data?.user?.username ? (
                                <div
                                    key={index}
                                >
                                    {<ReplyBox message={payload.message} sender='you' />}
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    className="mb-2"
                                >
                                    {<MessageTBox message={payload.message} sender={payload.sender} />}
                                </div>
                            )}
                        </div>



                    ))}

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
                                            <div className="h-[65px] flex flex-wrap w-[350px] mt-1 justify-center bg-white overflow-y-scroll">
                                                {selectedFile.map((file, index) => (
                                                    <ShowFiles index={index} filePath={file} />
                                                ))}
                                            </div>
                                        )
                                    }

                                </div>
                                <FiUpload
                                    className="text-white bg-purple-950 w-[40px] h-[65px] hover:text-gray-300"
                                    onClick={handleSendMessage}
                                />
                            </>

                    }

                </div>

            </div >
        </div >
    );
}

export default Room;
