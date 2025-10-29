// model for user
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    min: 5,
    max: 100,
     unique: true,
    required: true,
  },
  password: {
    type: String,
    
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
   

},{timestamps:true});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const User= mongoose.model("User", userSchema);

module.exports = User;
