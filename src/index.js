// require('dotenv').config({path:'./env'})
// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({ path: "./env" });

const app = express();

app.use(express.json()); // parse JSON

// Mount user routes
app.use("/api/v1/users", userRouter);

const startServer = async () => {
  await connectDB(); // errors are handled inside connectDB

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port ${process.env.PORT || 8000}`);
  });
};

startServer();


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