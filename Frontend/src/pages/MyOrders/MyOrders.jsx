import React, { useContext, useEffect, useState } from 'react' 
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  
  const [data,setData] =  useState([]);
  const {url,token,currency} = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorder",{},{headers:{token}});
    setData(response.data.data)
    // console.log(response.data.data);
    
  }

  //-----------------------initaiting razor pay here -------------------------------------------

  // const initiateRazorpay = async (orderId, amount) => {
  //   try {
  //     const { data } = await axios.post(url + "/api/order/place", { orderId, amount }, { headers: { token } });

  //     if (data.success) {
  //       const options = {
  //         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  //         amount: data.amount * 100,
  //         currency: "INR",
  //         name: "Grab & Go",
  //         description: "Order Payment",
  //         order_id: data.razorpayOrderId,
  //         handler: function (response) {
  //           console.log("Payment Successful!", response);
  //           fetchOrders();
  //         },
  //         theme: { color: "#3399cc" },
  //       };

  //       const rzp1 = new window.Razorpay(options);
  //       rzp1.on('payment.failed', function (response) {
  //         console.error("Payment Failed:", response.error.description);
  //         alert("Payment failed. Try again!");
  //       });

  //       rzp1.open();
  //     }
  //   } catch (error) {
  //     console.error("Error Initiating Payment:", error.message);
  //   }
  // };


  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h2>Your Orders </h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                }
                  else{
                    return item.name+" x "+item.quantity+ " , "
                }
                  
              })}</p>
              <p> {currency} ₹ {order.amount}.00</p>
              <p>Total Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>

              {/* Pay Now Button */}
              {/* {!order.payment && (
                <button onClick={() => initiateRazorpay(order._id, order.amount)}>
                  Pay Now
                </button>
              )} */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
