import mongoose, { model, Schema }  from "mongoose";
import { video } from "./video.models";
import bcrypt from'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
     
        trim:true,
    },    
    fullName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true,
    },   
    avatar:{
        type:String,//cloudnary url
        required:true,

    } ,
    coverImage:{
        type:String,
    },
    watchHIStory:[{
        typeof:Schema.Types.ObjectId,
        ref:"video"

    }],
    password:{
        type:String,
        required:[true,"passwordis required"]
    },
    RefreshTokens:{
        type:String,

    }




},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
            fullName:this.fullName,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
     jwt.sign(
        {
            _id:this._id,
            

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}
export const User = mongoose.model("User",userSchema)