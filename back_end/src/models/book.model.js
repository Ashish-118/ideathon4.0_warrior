import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
    sentByAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    forBranch: {
        type: String
    },
    forYear: {
        type: Number
    },
    bookPdf: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const Book = mongoose.model('Book', bookSchema);