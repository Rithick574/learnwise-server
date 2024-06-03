import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL?.trim();
    console.log(mongoUrl);

    if (!mongoUrl) {
      throw new Error("MongoDB connection string not provided in environment variables");
    }

    await mongoose.connect(mongoUrl);

    console.log(`
    _   
    _ __   __ _ _   _ _ __ ___   ___ _ __ | |_ 
   | '_ \\ / _\` | | | | '_ \` _ \\ / _ \\ '_ \\| __|
   | |_) | (_| | |_| | | | | | |  __/ | | | |_ 
   | .__/ \\__,_|\\__, |_| |_| |_|\\___|_| |_|\\__|
   |_|          |___/                          
  
        🍃🍃🍃🍃🍃🍃 MongoDB connected successfully!🍃🍃🍃🍃🍃🍃
      `);
  } catch (error) {
    console.error("🍁 Database Connection failed 🍁");
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
};
