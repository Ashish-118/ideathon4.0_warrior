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
        new ApiResponse(200, createdUser, "User completed part 1 of signup  Successfully")
    )

})


const signup_part2 = asyncHandler(async (req, res) => {
    const { userId, mobile_no, collegeInfo } = req.body;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(400, "Invalid or already verified user");
    }

    if (typeof mobile_no === 'number' && mobile_no.toString().length === 10) {
        throw new ApiError(400, "Invalid mobile number");
    }

    if (!collegeInfo?.collegeName || !collegeInfo?.yearOfStudy || !collegeInfo?.branch) {
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
    user.avatar = avatar;
    user.profileComplete = true;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Signup completed successfully",
    });


})
export { signup_part1 }
