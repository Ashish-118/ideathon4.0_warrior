import mongoose, { Schema } from "mongoose"


const chatSchema = new Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,

    },
    fileLink: {
        type: String,

    },
    ansAttachment: {
        type: String,
    },
    room: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    }

}, { timestamps: true })


export const Chat = mongoose.model("Chat", chatSchema)