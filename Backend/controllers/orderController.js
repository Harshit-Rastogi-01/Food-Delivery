import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

// const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY) 
// stripe secret key placed here

//placing order for frontend
const placeOrder = async (req,res)=>{
  
  const frontend_url = "http://localhost:5173" ;

  try {
    // Create new order in database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items : req.body.items,
      amount : req.body.amount ,
      address : req.body.address 
    })
    await newOrder.save() ; //it saves the order 
    await userModel.findByIdAndUpdate(req.body.userId , {cartData:{}}); //it helps to update the cart and make it empty again as soonn as order is placed 

    const line_items = req.body.items.map((item)=>({
      price_data:{
        currency : "inr" ,
        product_data : {
          name : item.name 

        } ,
        unit_amount : item.price , // conversion can take place here

      },
      quantity :item.quantity ,

    }))

    line_items.push({
      price_data :{
        currency: "inr" ,
        product_data:{
          name : "Delivery Charges"
        },
        unit_amount:  0,             // as we are concerned with pickup service only    
      },
      quantity : 1 
    })

    //taxes can also be pushed in the same manner ;


    const session  = await stripe.checkout.sessions.create({
      line_items : line_items ,
      mode: 'payment' ,
      success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({success:true , session_url:session.url})

  } catch (error) {
    console.log(error);
    res.json({success:false , message:error.message})
  }

}
const verifyOrder = async (req,res) => {
  const {orderId,success} = req.body ;
  try{
    if(success == "true"){  // here we are putting the false statement {we need to change false to true here}
      await orderModel.findByIdAndUpdate(orderId ,{payment:true});
      res.json({success:true , message:"paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Not Paid"});
    }
  }catch(error){
    console.log(error);
    res.json({success:false , message: error.message })
  }
};


// user order for frontend 

const userOrders = async(req,res) =>{
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true , data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false , message:error.message})
  }
}
export {placeOrder,verifyOrder ,userOrders}