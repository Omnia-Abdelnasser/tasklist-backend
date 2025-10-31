
const express=require('express')
require('dotenv').config()
const connectToDB = require('./config/db')
const authRoute=require('./route/auth.js')
const userRoute=require('./route/user.js')
const cors = require('cors');
const taskRoute=require('./route/task.js')
const logger = require('./middleware/logger.js')
const { notfound, errorHandler } = require('./middleware/error.js')
connectToDB()

const app=express()
//middleware

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
  })
);
    
app.use(logger)

//
app.use('/auth',authRoute)
app.use('/users',userRoute)
app.use('/tasks',taskRoute)
//
app.use(notfound)
app.use(errorHandler)

// running the server
const port=process.env.PORT||4000;
app.listen(port,()=>{
console.log(`server is running on port ${port}`)
})
