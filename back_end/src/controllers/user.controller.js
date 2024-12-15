import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { PYQ } from "../models/PYQ.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"


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
        isAdmin: (role === "faculty")
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
    const { userId, mobile_no, collegeInfo } = req.body;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const user = await User.findById(userId);
    if (!user || user.profileComplete) {
        throw new ApiError(400, "Invalid or already verified user");
    }

    if (!(/^\d{10}$/.test(mobile_no))) {
        throw new ApiError(400, "Invalid mobile number");
    }

    if (!collegeInfo?.collegeName) {
        throw new ApiError(400, "Complete college information is required");
    }
    if (((!user.isAdmin) && (!collegeInfo?.yearOfStudy || !collegeInfo?.branch)) || (user.isAdmin && !collegeInfo?.facultyOf)) {
        throw new ApiError(400, "Complete college information is required");
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

    const user = await User.findOne(
        {
            $and: [{ username }, { email }]
        }
    )

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    if (!user.profileComplete) {
        throw new ApiError(400, "You have not completed  the full step of  signup")

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


    const newPYQ = await PYQ.create({
        forYear,
        courseCode: CourseCode.toUpperCase(),
        paperYear,
        title,
        paperPdf: paperPdfLink?.url || null,
        solutionPdf: solutionPdfLink?.url || null,
        solutionVideo: solutionVideoLink?.url || null,
        sentByAdmin: Admin._id
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

export {
    signup_part1,
    signup_part2,
    Login,
    pyqUploader,
    pyq_filter
}
