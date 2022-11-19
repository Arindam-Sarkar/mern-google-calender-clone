import express from "express";

import {
  createTask,
  updateTask,
  removeTask,
  getAllTasks
} from "../controllers/taskController.js";

import { verifyUser } from "../utils/veryfyToken.js";

const router = express.Router()

router.post("/create/:userId", verifyUser, createTask)
router.put("/update/:userId", verifyUser, updateTask)
router.delete("/remove/:userId", verifyUser, removeTask)
router.get("/getall/:userId", verifyUser, getAllTasks)

export default router