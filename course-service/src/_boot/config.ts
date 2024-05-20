import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    
    if (!mongoUrl) {
      throw new Error(
        "MongoDB connection string not provided in environment variables"
      );
    }

    await mongoose.connect(mongoUrl.trim());

    console.log(`
    ___ ___  _   _ _ __ ___  ___ 
    / __/ _ \| | | | '__/ __|/ _ \
   | (_| (_) | |_| | |  \__ \  __/
    \___\___/ \__,_|_|  |___/\___|   
        🍃🍃🍃🍃🍃🍃 MongoDB connected successfully!🍃🍃🍃🍃🍃🍃
      `);
  } catch (error: any) {
    console.error(`🍁 Database Connection failed 🍁`);
    console.error(error.message);
    process.exit(1);
  }
};