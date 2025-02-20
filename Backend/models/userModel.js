import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {type:String , required:true },
  email: {type:String , required:true , unique : true },
  password :  {type:String , required:true } ,
  cartData : { type:Object , default : {}}
},{minimize:false})
//If you don’t use minimize: false, and cartData remains empty ({}), Mongoose will remove it before saving the document.

const userModel = mongoose.models.user || mongoose.model("user",userSchema) ;
// if the model is created then it will use it , else it will first create a model then use it 

export default userModel ;
