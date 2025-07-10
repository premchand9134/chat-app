import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Chat",
    });
    console.log(`MongoDB connected:`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
