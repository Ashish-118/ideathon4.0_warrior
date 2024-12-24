// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import { app } from "./app.js";

// dotenv.config({
//     path: './.env'
// });

// connectDB()
//     .then(() => {
//         app.on('error', (error) => {
//             console.log("Error when express is not able to talk with database ", error);
//             throw error
//         })
//         app.listen(process.env.PORT || 8000, () => {
//             console.log("Server is running on port " + process.env.PORT)
//         })
//     })
//     .catch((err) => {
//         console.error("MongoDb connection is failed !! ", err);
//     })



import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupChatSocket } from "../src/sockets/chat.socket.js"

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to the database
connectDB()
    .then(() => {
        // Create an HTTP server using the Express app
        const httpServer = createServer(app);

        // Initialize the WebSocket server
        const io = new Server(httpServer, {
            cors: {
                origin: "*", // Allow any origin; replace with your frontend's URL in production
            },
        });

        setupChatSocket(io);
        // Handle Express errors
        app.on('error', (error) => {
            console.error("Error when Express is not able to talk with database:", error);
            throw error;
        });

        // Start both HTTP and WebSocket servers
        const PORT = process.env.PORT || 8000;
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });
