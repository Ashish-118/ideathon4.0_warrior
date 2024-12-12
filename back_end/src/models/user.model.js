import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        // required: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],

    },
    mobile_no: {
        type: Number,
        // required: true,

    },
    collegeInfo: {
        collegeName: {
            type: String,
            // required: true
        },
        yearOfStudy: {
            type: Number,
            // required: true,
            min: 1,         // Validation: minimum value 1 (first year)
            max: 5          // Validation: maximum value 5 (final year)
        },
        branch: {
            type: String,
            // required: true,
        }
    },
    profileComplete: {
        type: Boolean,
        default: false
    }
    ,
    refreshToken: {
        type: String,
    }

}, { timestamps: true })



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_EXPIRY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}


export const User = mongoose.model("User", userSchema)