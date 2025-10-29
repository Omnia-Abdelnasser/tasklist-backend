const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { validate, UpdateValidate } = require('../validate/user-validate');
const Task = require('../model/task');
const { verifyTokenAndAuthorization } = require('../middleware/verifytoken');

const router = express.Router();

//  Get all users
router.get('/', async (req, res) => {
  try {
        const users = await User.find();

    const result = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({ user: user._id });
        return { ...user._doc, tasks };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

//  Get user by ID
router.get('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
        const tasks = await Task.find({ user: user._id });

   
    res.status(200).json({
      ...user._doc,
      tasks
    });
   
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

//  Delete user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not exist" });
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

//  Update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  const { error } = validate(UpdateValidate, req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
 
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not exist" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports = router;
