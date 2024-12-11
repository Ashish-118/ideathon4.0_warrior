import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trime: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trime: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudingary url will come here
        required: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],

    },
    mobile_no: {
        type: Number,
        required: true,

    },
    collegeInfo: {
        collegeName: {
            type: String,
            required: true
        },
        yearOfStudy: {
            type: Number,
            required: true,
            min: 1,         // Validation: minimum value 1 (first year)
            max: 5          // Validation: maximum value 5 (final year)
        },
        branch: {
            type: String,
            required: true,
        }
    }
    ,
    refreshToken: {
        type: String,
    }

}, { timestamps: true })