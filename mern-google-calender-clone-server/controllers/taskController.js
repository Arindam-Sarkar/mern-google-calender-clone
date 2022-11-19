import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createErrorMsg } from '../utils/errorResponse.js'

import taskModel from '../models/taskModel.js'

export const createTask = async (req, res, next) => {
  const newTask = taskModel(req.body)
  try {
    const savedTask = await newTask.save({ new: true })
    res.status(200).json(savedTask)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const updatedTasks = await taskModel.findOneAndUpdate(
      { userId: req.params.userId, taskId: req.body.taskId }, { ...req.body }, { new: true },)
    res.status(200).json(updatedTasks)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const removeTask = async (req, res, next) => {
  try {
    const updatedTasks = await taskModel.findOneAndDelete(
      { userId: req.params.userId, taskId: req.body.taskId }, { new: true })
    res.status(200).json(updatedTasks)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getAllTasks = async (req, res, next) => {
  try {
    const searchedTasks = await taskModel.find({ userId: req.params.userId })
    res.status(200).json(searchedTasks)
  } catch (error) {
    next(error)
  }
}