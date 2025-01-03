import mongoose, { Schema } from "mongoose"



const pyqSchema = new Schema(
    {
        forYear: {
            type: String,
            required: true,
        },
        courseCode: {
            type: String,
            required: true,
        },
        paperPdf: {
            type: String,
            required: true,
        },
        solutionPdf: {
            type: String,

        },
        solutionVideo: {
            type: String,

        },
        paperYear: {
            type: String,
            required: true,
        },
        profileLink: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        collegeName: {
            type: String,
            required: true,
        },
        sentByAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, { timestamps: true }

)



export const PYQ = mongoose.model("PYQ", pyqSchema)