import { Chat } from '../models/chat.model.js'; // Import your Chat schema
import { User } from '../models/user.model.js'; // Import your User schema

export const setupChatSocket = (io) => {

    const formatTime12Hour = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };
    io.on("connection", (socket) => {
        // console.log("New user connected:", socket.id);

        // Join chatroom based on user's college
        socket.on("joinChat", async (userId) => {
            const user = await User.findById(userId);
            if (!user || !user.collegeInfo?.collegeName) {
                return socket.emit("error", "Invalid user or college information.");
            }

            const room = user.collegeInfo.collegeName;
            socket.join(room);


            // const chatHistory = await Chat.find({ room }).sort({ createdAt: 1 });
            const chatHistory = await Chat.find({ room })
                .sort({ createdAt: 1 })
                .populate({
                    path: "ansAttachment",
                    model: "Attach",
                    select: " AttachTo fileType fileLink room sender createdAt",

                });
            // console.log(chatHistory)
            socket.emit("chatHistory", chatHistory);
        });

        // Listen for chat messages
        socket.on("chat", async ({ userId, message }) => {
            const user = await User.findById(userId);
            if (!user || !user.collegeInfo?.collegeName) {
                return socket.emit("error", "Invalid user or college information.");
            }

            const room = user.collegeInfo.collegeName;
            const chatMessage = new Chat({
                room,
                sentBy: userId,
                message,
                sender: user.username,
                isAdmin: user?.isAdmin

            });
            await chatMessage.save();

            // Broadcast the message to the room
            io.to(room).emit("chat", {
                message: chatMessage.message,
                sender: user.username,
                createdAt: chatMessage.createdAt,
                _id: chatMessage?._id,
                isAdmin: chatMessage?.isAdmin
            });
        });

        socket.on("file", async ({ userId, fileLink, fileType, createdAt, chatId }) => {
            const user = await User.findById(userId);
            if (!user || !user.collegeInfo?.collegeName) {
                return socket.emit("error", "Invalid user or college information.");
            }

            const room = user.collegeInfo.collegeName;
            io.to(room).emit("file", {
                fileLink: fileLink,
                fileType: fileType,
                sender: user.username,
                createdAt: createdAt,
                _id: chatId,
                isAdmin: user?.isAdmin
            });
        })

        socket.on("attach", async ({ attachmentResponse }) => {
            if (!attachmentResponse) {
                console.log("Attachment response is empty or undefined")
            }
            const room = attachmentResponse?.room
            io.to(room).emit("attach", {


                ansAttachment: attachmentResponse
            });
        })

        // Handle disconnection
        socket.on("disconnect", () => {

        });
    });
};
