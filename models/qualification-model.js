import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    completionDate: { type: Date, required: [true, "Completion date is required"] },
    description: { type: String, required: [true, "Description is required"] },
  },
  { timestamps: true }
);

export default mongoose.model("Qualification", qualificationSchema);
