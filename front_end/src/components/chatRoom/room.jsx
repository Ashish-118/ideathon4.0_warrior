import React, { useEffect, useState, useRef } from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiPaperClip } from "react-icons/hi2";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { io } from "socket.io-client";
import useUser from "../../context/user.jsx";
import { BsChatLeftFill } from "react-icons/bs";
import { BsChatRightFill } from "react-icons/bs";
import MessageTBox from "./otherMessageBox.jsx";
import ReplyBox from "./replyBox.jsx";

function Room() {
    const [Message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const { user } = useUser();
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null); // To scroll to the end of the messages container

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

    // Handle message send
    const handleSendMessage = (e) => {
        e.preventDefault();

        const socketInstance = socketRef.current;
        const userId = user?.data?.user?._id;
        if (socketInstance && Message.trim()) {
            // Emit the chat message
            socketInstance.emit("chat", { userId, message: Message });
            // console.log(Message, " ", userId)
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
            <div className="w-[400px] h-[700px] bg-gray-900 rounded-lg border-2 border-menuItem shadow-2xl shadow-menuItem">
                <div className="flex flex-col h-[45px] w-[400px] justify-center">
                    <h1 className="text-white font-baloo text-center text-2xl mt-3">Doubt room</h1>
                    <hr className="mt-1" />
                </div>

                <div className="text-gray-400 flex">
                    <h3>Online</h3>
                </div>


                <div className="w-[400px] h-[475px] overflow-y-auto px-3 py-2 bg-slate-800  ">

                    {chatHistory.map((payload, index) => (


                        <div className="">
                            {payload.sender === user?.data?.user?.username ? (
                                <div
                                    key={index}
                                    className={``}
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


                <div className="flex">
                    <HiPaperClip className="text-white rounded-l ml-1 items-center bg-menuItem w-[30px] h-[40px] hover:text-gray-200" />
                    <input
                        type="text"
                        placeholder="Ask Question"
                        className="w-[280px] h-[40px] rounded-r text-center outline-none"
                        value={Message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <HiMiniRocketLaunch
                        className="text-white w-[25px] h-[40px] ml-2.5 hover:text-red-400"
                        onClick={handleSendMessage}
                    />
                </div>
            </div >
        </div >
    );
}

export default Room;
