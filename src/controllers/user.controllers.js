 import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log("email:", email);

  // Validate all required fields
  if ([fullName, email, username, password].some((f) => !f || f.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check for existing user
  const existedUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Upload avatar (required) and cover image (optional)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : "";

  // Create user
  const user = await User.create({
    fullName,
    username: username.toLowerCase(), // always lowercase
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // Remove sensitive fields from response
  const createdUser = await User.findById(user._id).select("-password -RefreshTokens");

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

export { registerUser };
