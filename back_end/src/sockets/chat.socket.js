import { Chat } from '../models/chat.model.js'; // Import your Chat schema
import { User } from '../models/user.model.js'; // Import your User schema

export const setupChatSocket = (io) => {
    io.on("connection", (socket) => {
        // console.log("New user connected:", socket.id);

        // Join chatroom based on user's college
        socket.on("joinChat", async (userId) => {
            const user = await User.findById(userId);
            if (!user || !user.collegeInfo?.collegeName) {
                return socket.emit("error", "Invalid user or college information.");
            }

            const room = user.collegeInfo.collegeName; // College name as the room
            socket.join(room);
            // console.log(`User ${userId} joined room: ${room}`);

            // Fetch and send chat history for the room
            const chatHistory = await Chat.find({ room }).sort({ timestamp: 1 });
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

            });
            await chatMessage.save();

            // Broadcast the message to the room
            io.to(room).emit("chat", {
                message: chatMessage.message,
                sender: user.username,
                timestamp: chatMessage.timestamp,
                chatId: chatMessage?._id
            });
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            // console.log("User disconnected:", socket.id);
        });
    });
};
