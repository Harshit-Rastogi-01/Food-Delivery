import mongoose from "mongoose" ;

export const connectDB = async() =>{
  await mongoose.connect('mongodb+srv://GrabandGo:HarshitMaurvi@cluster0.pz0ux.mongodb.net/food-del').then(()=> console.log("DB-Connected"));
}