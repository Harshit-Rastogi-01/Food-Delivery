import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "./Order.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { getTotalCartAmount, token, cartItems, food_list, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    Name: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 0, // Add delivery/convenience fee if needed
    };

    try {
      const { data: orderResponse } = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: { token },
        }
      );

      if (orderResponse.success) {
        // Start Razorpay Payment Flow
        // console.log(orderResponse);
        const options = {
          key: rzp_test_4nJlPFmSWqS2Fe,
          amount: orderResponse.amount * 100,
          currency: "INR",
          name: "Grab & Go",
          description: "Test Transaction",
          order_id: orderResponse.razorpayOrderId,
          handler: function (response) {
            // Pass payment details to backend for verification
            // console.log("abcde");
            axios
              .post(url + "/api/order/verify", {
                orderId: orderResponse.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              })
              .then((verificationResponse) => {
                if (verificationResponse.data.success) {
                  toast.success("Payment Successful ");
                  navigate("/myorders");
                } else {
                  toast.error("Payment Verification Failed");
                  navigate("/");
                }
              })
              .catch((error) => {
                console.error("Verification Error:", error);
                toast.error("Verification Error");
                navigate("/");
              });
          },
          prefill: {
            name: data.Name,
            contact: data.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.error("Please Login first");
      }
    } catch (error) {
      console.error("Payment Initiation Error:", error.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <ToastContainer />
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="Name"
            onChange={onChangeHandler}
            value={data.Name}
            type="text"
            placeholder="Name"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{0}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount() + 0}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
