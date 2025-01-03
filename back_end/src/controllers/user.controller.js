import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { PYQ } from "../models/PYQ.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken";
import { Book } from "../models/book.model.js";
import { Chat } from "../models/chat.model.js";
import fs from 'fs';



const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, " Something went wrong while generating access and refresh token")
    }
}

const signup_part1 = asyncHandler(async (req, res) => {
    const { username, fullName, email, password, role } = req.body;

    if ([fullName, email, password, username, role].some((field) => field?.trim() === "")) {
        throw new ApiError(404, "All fields are required")
    }
    const eduInRegex = /^[^\s@]+@[^\s@]+\.edu\.in$/;

    if (!eduInRegex.test(email)) {
        throw new ApiError(400, "Invalid email address")
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
        password,
        isAdmin: (role === "admin")
    })

    // now removing password and refreshToken  to send as response  , this will not remove  password and refreshToken from the database
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Soemthing went wrong while registering the user ")

    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User completed part 1 of signup  Successfully")
    )

})


const signup_part2 = asyncHandler(async (req, res) => {
    const { userId, mobile_no } = req.body;
    let collegeInfo;

    // Parse collegeInfo safely
    try {
        collegeInfo = JSON.parse(req.body.collegeInfo);
    } catch (err) {
        throw new ApiError(400, "Invalid collegeInfo format");
    }


    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const user = await User.findById(userId);
    if (!user || user.profileComplete) {
        throw new ApiError(391, "Invalid or already verified user");
    }

    if (!(/^\d{10}$/.test(mobile_no))) {
        throw new ApiError(392, "Invalid mobile number");
    }
    console.log("collede info ", collegeInfo.collegeName)
    if (!collegeInfo.collegeName) {
        throw new ApiError(394, "jesus Complete college information is required");
    }
    if (((!user.isAdmin) && (!collegeInfo.yearOfStudy || !collegeInfo.branch)) || (user.isAdmin && !collegeInfo.facultyOf)) {
        throw new ApiError(394, "Ashish Complete college information is required");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Error while uploading avatar to cloudinary")
    }

    user.collegeInfo = collegeInfo;
    user.mobile_no = mobile_no;
    user.avatar = avatar.url;
    user.profileComplete = true;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Signup completed successfully",
    });


})

const Login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].some((item) => item?.trim() === "")) {
        throw new ApiError(400, "All fields are required for Loing")
    }
    console.log(username, email, password)
    const user = await User.findOne(
        {
            $and: [{ username }, { email }]
        }
    )

    if (!user) {
        throw new ApiError(401, "User not found")
    }



    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User Logged in successfully"
            )
        )
})

const pyqUploader = asyncHandler(async (req, res) => {

    const { forYear, CourseCode, paperYear, title } = req.body;

    if ([forYear, CourseCode, paperYear, title].some((item) => item?.trim() === "")) {
        throw new ApiError(404, "All fields are required for pyq uploader")
    }
    const Admin = await User.findById(req.user?._id);

    const paperPdf_localPath = req.files?.paperPdf[0]?.path;
    const solutionPdf_localPath = req.files?.solutionPdf[0]?.path;
    const solutionVideo_localPath = req.files?.solutionVideo[0]?.path;

    if (!paperPdf_localPath || (!solutionPdf_localPath && !solutionVideo_localPath)) {
        throw new ApiError(400, "Question Paper and Solution are required  ")
    }

    const paperPdfLink = await uploadOnCloudinary(paperPdf_localPath, "raw")
    console.log(paperPdfLink.url);
    if (!paperPdfLink) {
        throw new ApiError(400, "Error while uploading paperPdf to cloudinary")
    }
    let solutionPdfLink = null;
    if (solutionPdf_localPath) {

        solutionPdfLink = await uploadOnCloudinary(solutionPdf_localPath, "raw")

        console.log(solutionPdfLink.url);
    }
    let solutionVideoLink = null
    if (solutionVideo_localPath) {
        solutionVideoLink = await uploadOnCloudinary(solutionVideo_localPath)
    }
    if (!solutionVideoLink && !solutionPdfLink) {
        throw new ApiError(400, "Error while uploading solution to the cloudinary")
    }

    const newPYQ = await PYQ.create({
        forYear,
        courseCode: CourseCode.toUpperCase(),
        paperYear,
        title,
        paperPdf: paperPdfLink?.url || null,
        solutionPdf: solutionPdfLink?.url || null,
        solutionVideo: solutionVideoLink?.url || null,
        sentByAdmin: Admin._id,
        collegeName: Admin.collegeInfo.collegeName,
        sender: Admin.username,
        profileLink: Admin.avatar

    })

    return res.status(200)
        .json(
            new ApiResponse(200, newPYQ, "successfully stored new Pyq")
        )


})

const pyq_filter = asyncHandler(async (req, res) => {
    const { forYear, courseCode } = req.body
    const user = await User.findById(req.user?._id)
    const userCollege = user.collegeInfo.collegeName;
    if (!forYear && !courseCode) {
        throw new ApiError(404, "All fields are required for pyq filter year")
    }

    const filteredPyq = await PYQ.aggregate([
        {
            $match: {
                forYear: forYear || { $exists: true },
                courseCode: courseCode?.toUpperCase() || { $exists: true }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "sentByAdmin",
                foreignField: "_id",
                as: "admin"
            }
        },
        {
            $match: {
                "admin.collegeInfo.collegeName": userCollege
            }
        }

    ])


    return res.status(200)
        .json(
            new ApiResponse(
                200,
                filteredPyq,
                "Successfully filtered Pyqs"
            )
        )
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, " unauthorized request ")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken, refreshToken: newRefreshToken
                    },
                    " AccessToken refreshed "
                )
            )
    }
    catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: null
            }
        },
        {
            new: true
        }
    )


    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, `User logged Out ${req.user.refreshToken}`))

})



const DeletePyq = asyncHandler(async (req, res) => {

    const pyqId = req.params.pyqId.trim()

    if (!pyqId) {
        throw new ApiError(400, "PyQ ID is required")
    }

    const deletedPyq = await PYQ.findByIdAndDelete(pyqId);
    if (!deletedPyq) {
        throw new ApiError(404, "PyQ not found")
    }

    return res.status(200).json(
        new ApiResponse(200, {}, `succesfully deleted pyq of id ${pyqId}`)
    )
})


const getPyq = asyncHandler(async (req, res) => {
    const userCollege = req.user?.collegeInfo.collegeName

    if (!userCollege) {
        throw new ApiError(401, "Unauthorized request")
    }
    const all_pyqs_of_user = await PYQ.aggregate([
        {
            $match: {
                collegeName: userCollege
            }
        }
    ])
    return res.status(200).json(
        new ApiResponse(200, all_pyqs_of_user, `Successfully fetched pyq of user ${userCollege} from mongoDb`)
    )

})


const getBook = asyncHandler(async (req, res) => {
    const collegeName_user = req.user?.collegeInfo.collegeName

    const books = await Book.aggregate([
        {
            $match: {
                collegeName: collegeName_user
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, books, ` Successfully fetched books for college ${collegeName_user}`)
    )
})


const uploadBook = asyncHandler(async (req, res) => {
    const { forYear, forBranch, title, author } = req.body;

    //  NOTE:  by default i will send forYear and forBranch as  'all'
    if ([title, author].some((item) => item?.trim() === "")) {
        throw new ApiError(404, "All fields are required for pyq uploader")
    }
    const Admin = await User.findById(req.user?._id);

    const file_localPath = req.file?.path;


    if (!file_localPath) {
        throw new ApiError(400, " not found local path of book")
    }
    const fileLink = await uploadOnCloudinary(file_localPath, "raw")


    if (!fileLink) {
        throw new ApiError(400, "Error while uploading bookPdf to cloudinary")
    }



    const fileChat = await Book.create({
        forYear,
        forBranch,
        title,
        author,
        bookPdf: fileLink?.url,
        sentByAdmin: Admin._id,
        collegeName: Admin.collegeInfo.collegeName

    })

    return res.status(200)
        .json(
            new ApiResponse(200, fileChat, "successfully stored new book")
        )


})

const getUserProfile = asyncHandler(async (req, res) => {

})

const fileUpload = asyncHandler(async (req, res) => {
    const { room, sentBy, sender } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
        throw new ApiError(400, "No files found");
    }

    const fileChats = [];

    for (const file of files) {
        try {
            // Upload the file to Cloudinary
            const file_localPath = file.path;


            // Read the file locally for Base64 encoding

            let cloudinaryResponse = null;

            if (file.mimetype === "application/pdf") {
                cloudinaryResponse = await uploadOnCloudinary(file_localPath, "raw");
            } else if (file.mimetype.startsWith("image/")) {
                cloudinaryResponse = await uploadOnCloudinary(file_localPath, "image");
            } else if (file.mimetype.startsWith("video/")) {
                cloudinaryResponse = await uploadOnCloudinary(file_localPath, "video");
            } else {
                throw new ApiError(400, `Unsupported file type: ${file.mimetype}`);
            }

            if (!cloudinaryResponse) {
                throw new ApiError(400, "Ashish, Error while uploading file to Cloudinary");
            }
            // Create a file chat object
            const fileChat = await Chat.create({
                room,
                sentBy,
                sender,
                fileType: file.mimetype,
                fileLink: cloudinaryResponse?.url, // Store Cloudinary link in MongoDB
            });

            fileChats.push(fileChat);


        } catch (err) {
            throw new ApiError(500, `Error processing file ${file.originalname}: ${err.message}`);
        }
    }

    return res.status(200).json(new ApiResponse(200, fileChats, "Successfully stored file chats"));
});

export {
    signup_part1,
    signup_part2,
    Login,
    pyqUploader,
    pyq_filter,
    refreshAccessToken,
    logoutUser,
    DeletePyq,
    getPyq,
    getBook,
    uploadBook,
    fileUpload
}
