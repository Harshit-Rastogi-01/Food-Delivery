import mongoose from "mongoose" 

const orderSchema = new mongoose.Schema({
  userId:{type:String , required :true } ,
  items:{type: Array  ,required : true },
  amount : {type:Number , required : true},
  address : {type: Object }, //required true removed  
  status : {type : String , default :"Food Processing"} ,
  date : {type :Date , default: Date.now} ,
  payment : {type:Boolean , default : false }  // it should be by default false but i have done it true due to my own convienience . 
}) 

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema) ;

export default orderModel ;