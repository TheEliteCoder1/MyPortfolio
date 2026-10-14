// Connects to MongoDB using the connection string stored in .env
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: database "${mongoose.connection.name}"`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
