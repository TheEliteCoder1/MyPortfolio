import mongoose from "mongoose";

// timestamps adds the created date (createdAt) and updated date (updatedAt)
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Email is not valid"] },
    // Only the bcrypt hash is stored; select:false keeps it out of queries by default
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

// Never include the hash in JSON responses
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
