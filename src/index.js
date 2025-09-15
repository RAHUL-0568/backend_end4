// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import mongoose from "mongoose";
import {DB_name} from "./constant.js"
import connectDB from "./db/index.js"


dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
        
    })
}).catch((err) => {
console.log("mongodb connection failed !!");
    
});


// import express from'express'
// const app=express()

// (async () => {
//     try{
//        await mongoose.connect(`${process.env.MOGODB_URL}/${DB_name}`)
//        app.on("error",(error)=>{
//         console.log("ERR",error);
//        throw error 
//           })

//      app.listen(process.env.PORT,()=>{
//         console.log(`app is listening on port ${process.env.PORT}`);
        
//      })

//     }catch(error){
//         console.log("ERROR",error);
//         throw err
        
//     }
// } ) ()