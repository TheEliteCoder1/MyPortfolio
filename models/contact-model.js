import mongoose from "mongoose";

// Fields match the Assignment 1 contact form
const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"], trim: true },
    lastName: { type: String, required: [true, "Last name is required"], trim: true },
    phone: { type: String, trim: true },
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Email is not valid"] },
    message: { type: String, required: [true, "Message is required"] },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
