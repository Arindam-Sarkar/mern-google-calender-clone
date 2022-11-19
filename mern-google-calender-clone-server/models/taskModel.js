import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: String },
  taskId: { type: Number, unique: true },
  taskDate: { type: Object },
  taskTitle: { type: String },
  taskDesc: { type: String },
  taskColor: { type: Number }
}, {
  timestamps: true,
  collection: 'tasks'
})

export default mongoose.model("Task", TaskSchema);