import mongoose, { Schema } from "mongoose"


const chatSchema = new Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    andAttachment: {
        type: String,
    }
}, { timestamps: true })


export const Chat = mongoose.model("Chat", chatSchema)