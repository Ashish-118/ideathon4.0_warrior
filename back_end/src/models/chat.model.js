import mongoose, { Schema } from "mongoose"


const chatSchema = new Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,

    },
    fileType: {
        type: String,
    },
    fileLink: {
        type: String,
    },
    ansAttachment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attach"
        }
    ],
    room: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean
    },
    sender: {
        type: String,
        required: true,
    }

}, { timestamps: true })


export const Chat = mongoose.model("Chat", chatSchema)