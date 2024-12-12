import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"


const signup_part1 = asyncHandler(async (req, res) => {
    const { username, fullName, email, password } = req.body;

    if ([fullName, email, password, username].some((field) => field?.trim() === "")) {
        throw new ApiError(404, "All fields are required")
    }

    const existedUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const newUser = await User.create({
        username: username.toLowerCase(),
        fullName,
        email,
        password
    })

    // now removing password and refreshToken  to send as response  , this will remove  password and refreshToken from the database
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Soemthing went wrong while registering the user ")

    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})
