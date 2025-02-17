import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv"
import Razorpay from "razorpay";
import crypto from "crypto";

dotenv.config();
// console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // Create new order in database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    })
    // added to check req.body 
    console.log("request body : " , req.body);

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Calculate the total amount
    const totalAmount = req.body.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    // Create Razorpay order
    const options = {
      amount: totalAmount*100, // Amount in paise
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);


    // Generate success and cancel URLs in backend
    const success_url = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;
    const cancel_url = `${frontend_url}/verify?success=false&orderId=${newOrder._id}`;

     //testing urls
    //  console.log("New Order ID:", newOrder._id);
    //  console.log("Success URL:", success_url);
    //  console.log("Cancel URL:", cancel_url);

    // Respond to frontend with Razorpay order details and URLs
    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
      session_url : success_url,
      cancel_url,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
    req.body;
  try {
    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpaySignature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Verification Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, verifyOrder, userOrders };
