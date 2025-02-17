import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css';

const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async (paymentDetails) => {
    try {
      // Send payment details to backend for verification
      const response = await axios.post(url + "/api/order/verify", {
        orderId,
        ...paymentDetails
      });

      if (response.data.success) {
        console.log("Payment Verified Successfully");
        navigate("/myorders");
      } else {
        console.error("Verification Failed:", response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      navigate("/");
    }
  };

  const initiateRazorpay = async () => {
    try {
      console.log("Initiating order placement using Razorpay...");

      // Check if required local storage items exist
      const userId = localStorage.getItem("userId");
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const totalAmount = localStorage.getItem("totalAmount");
      const address = localStorage.getItem("address");

      if (!userId || !cartItems || !totalAmount || !address) {
        console.error("Missing order details in local storage.");
        navigate("/");
        return;
      }

      const { data } = await axios.post(url + "/api/order/place", {
        userId,
        items: cartItems,
        amount: totalAmount,
        address: address,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      });

      console.log("Order Placement Response:", data);

      if (data.success) {
        console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,  /// Ensuring this is set in .env file
          amount: data.amount * 100,
          currency: "INR",
          name: "Grab & Go",
          description: "Order Payment",
          order_id: data.razorpayOrderId,
          handler: function (response) {
            // Pass payment details to verifyPayment function
            verifyPayment({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
          },
          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          console.error("Payment Failed:", response.error.description);
          navigate("/"); // Redirect to home on payment failure
        });
        rzp1.open();
      } else {
        console.error("Please Login First", data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Payment Initiation Error:", error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    if (success === "true") {
      initiateRazorpay();
    } else {
      console.log("Order failed");
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
