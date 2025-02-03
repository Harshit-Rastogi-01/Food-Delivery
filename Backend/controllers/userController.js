import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken" // for authentication
import bcrypt from "bcrypt" // for password hashing in Signup , and for password comparison in Login 
import validator from "validator" //Used for validating user input, such as checking if an email is valid or ensuring a password meets security criteria.

// User signs up → validator checks input → bcrypt hashes password → userModel saves it in MongoDB.
// User logs in → bcrypt compares passwords → jwt generates a token → User is authenticated

//login user 
const loginUser = async(req,res) => {
  const {email , password } = req.body ;
  try{
    const user = await userModel.findOne({email})
    if(!user){
      return res.json({success:false , message:"No such user exsists"}) 
    }
    const isMatch = await bcrypt.compare(password,user.password) // for matching the enterd passwords ,and actual passwords
    if(!isMatch){
      return res.json({success:false , message:"Invalid Credentials"})
    }
    // if all the credentials match  
    const token = createToken(user._id);
    res.json({success:true,token})
  }catch(error){
    console.log(error);
    res.json({success:false , message:error.message})
  }
}

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET);
}

//register user 
const registerUser = async (req,res) =>{
  const {name,password,email}  = req.body;
  try {
    // checking if user already exists
    const exists = await userModel.findOne({email}) ;
    if(exists){
      return res.json({success:false ,  message:"User Already Exsists"})
    }
    // validating email format and strong password 
    if(!validator.isEmail(email)){
      return res.json({success:false , message: "Please enter a valid email address"})
    }
    //password length is explicitly set to 8 , below it will not take it 
    if(password.length<8){
      return res.json({success:false , messgae:"Please enter a strong Password"})
    }
    //encrypting the password 
    const salt = await bcrypt.genSalt(10) // higher the value of salt higher will be the protection hence higher time it will take to encrypt the password , slower will be process 
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new userModel({
      name: name, 
      email:email ,
      password:hashedPassword // due to encryption we are storing the hashedPassword in our DB
    })
    const user = await newUser.save()

    const token  = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

export {loginUser,registerUser}