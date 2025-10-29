

const express=require('express')
const bcrypt =require('bcrypt')
const router = express.Router();
const User =require('../model/user');
const { LoginValidate, RegisterValidate } = require('../validate/user-validate');
 
// register route
router.post("/register", async (req, res) => {

  const { error } = RegisterValidate.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
  
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }


    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

 
    await newUser.save();
    const token = newUser.generateAuthToken();

    res.status(200).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});


// login route
router.post("/login", async (req, res) => {

  const { error } = LoginValidate.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
  
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }


    const IsMatch = await bcrypt.compare(req.body.password,user.password);
  if(!IsMatch){
     return res.status(400).json({ message: "invalid email or password" });
  }
   const token = user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports=router


 








module.exports=router