import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Every task should have a title
    trim: true, // Removes leading/trailing spaces
  },
  description: {
    type: String,
    default: "", // Optional description
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"], // Limit allowed values
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: {
    type: Date,
    default: null, // Optional due date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to a user collection (if tasks belong to users)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Task", taskSchema);
