import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("Mongo connection URL not provided");
    }
    await mongoose.connect(mongoUrl.trim());
    console.log(`
        __              _    
       [  |            / |_  
 .---.  | |--.   ,--. \| |-' 
/ /'\\] | .-. |  \`'_\\ : | |   
| \\__.  | | | | // | |,| |,  
'.___.'[___]|__]\'-;__/\__/  
                             
       🍃🍃🍃🍃🍃MONGO DB CONNECTED🍃🍃🍃🍃🍃🍃🍃`);
  } catch (error) {
    console.error("Error happened in MongoDB connection:", error);
    process.exit(1);
  }
};

export default connectDB;
