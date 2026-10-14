import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    completionDate: { type: Date, required: [true, "Completion date is required"] },
    description: { type: String, required: [true, "Description is required"] },
    // Optional extras from the Assignment 1 project cards
    role: String,
    outcome: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
