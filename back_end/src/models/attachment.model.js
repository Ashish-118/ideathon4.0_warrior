import mongoose, { Schema } from "mongoose"


const attachSchema = new Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    AttachTo: {
        type: String,

    },
    fileType: {
        type: [String],
    },
    fileLink: {
        type: [String],
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


export const Attach = mongoose.model("Attach", attachSchema)