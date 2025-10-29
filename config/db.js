const { default: mongoose } = require("mongoose");


  async function connectToDB(){
    try{
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("mongodb is connected")
    }catch{
          console.log("mongodb is not connected") 
    }

}
module.exports=connectToDB