const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
 title: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true,
  },
  description: {
    type: String,
    min: 10,
    max: 100,
    required: true,
  },
  completed: {
    type: Boolean,
    trim: true,
   default:false
  },
    user: {
     type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
     
    },


},{timestamps:true});

const Task= mongoose.model("Task", taskSchema);

module.exports = Task;
