import {asyncHandler} from "../utils/asynchandler.js"
import { apiError } from "../utils/ApiError.js" 
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/Apiresponse.js"
const registerUser = asyncHandler( async(req,res)=>{
   //get user data from frontend
   //validation -  not empty
   //check if user already exist: username, email
   // check for images, check for avatar
   // upload them to cloudnary,avatar
   //create user obeject- create entry in db
   //remove password and refresh token feed from response
   // check for user creation 
   //return response  
    const {fullName, email , password, username}=req.body
    console.log("email:", email)

    // if (fullName===""){
    //     throw new apiError(400,"fullname is required")
    // }
    if(
        [
            fullName,email,username,password
        ].some((field)=>field?.trim()==="")
    ){
        throw new apiError(400,"all fields are required")
    }

    const existedUser = User.findOne({
        $or:[{username}, {email}]
    })
    console.log(existedUser);
    
    if(existedUser){
        throw new apiError(409,"user with email or username already existed")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath){
        throw new apiError (400,"Avatar file is required")
    }

    const avatar =await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

     if (!avatar){
        throw new apiError (400,"Avatar file is required")
    }
    
   const user = User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        username: username.toLowerCase()
    })

    const createdUser =await User.findById(user._id).select(
        "-password -refreashToken"
    )
    if(!createdUser){
        throw new apiError("500","something went while registring user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered Succcessfully")
    )
})




export {  
    registerUser, 
}