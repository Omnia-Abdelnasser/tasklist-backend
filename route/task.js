const express = require('express');
const Task = require('../model/task');
const { verifyToken } = require('../middleware/verifytoken');

const route = express.Router();

//  Get all tasks 
route.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).populate('user');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

//  Get a single task 
route.get('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

//  Add new task 
route.post('/', verifyToken, async (req, res) => {
  try {
    
    const existingTask = await Task.findOne({
      title: req.body.title,
      user: req.user._id
    });
    if (existingTask) {
      return res.status(400).json({ message: "Task already exists" });
    }

    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed || false,
      user: req.user._id, 
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// 🟡 Update a task 
route.put('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or not yours" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

//delete a task
route.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or not yours" });
    }

    res.status(200).json({ message: "Task has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports = route;
