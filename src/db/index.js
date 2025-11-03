import mongoose from "mongoose";

import { DB_name } from "../constant.js"; 

const connectDB = async()=>{
    try{
      const connectionInstance = await mongoose.connect(
  `${process.env.MONGODB_URL}/${DB_name}`);


      console.log(`\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`);

       

    }
    catch(error){
        console.log("MONOGODB connection fail",error);
        process.exit(1)
    }
}

export default connectDB;