import React from 'react'
import axios from "axios"
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify'
import'./Order.css'
import {useContext ,useState, useEffect} from 'react';
import {StoreContext} from '../../Context/StoreContext'
const Order = () => {
  const {getTotalCartAmount , token , cartItems , food_list , url } = useContext(StoreContext);
  
  const [data , setData] = useState({
    Name: "" ,
    // lastName : "" ,
    // email: "",
    // street:"" ,
    // city:"" ,
    // state:"" ,
    // zipcode:"",
    // country:"",
    phone:"" 
  })

  const onChangeHandler = (event) => {
    const name = event.target.name ;
    const value = event.target.value;
    setData(data => ({...data,[name]:value }));
  }
  // useEffect(()=>{
  //   console.log(data) ;
  // },[data])
  // we just used it for cross verification of onChangeHandler

  const placeOrder = async (event)=>{
    event.preventDefault(); //this will prevent the page from reloading when we will submit the form 
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id] ;
        orderItems.push(itemInfo) ;        
      }
    })  
    let orderData = {
      address:data ,
      items:orderItems,
      amount:getTotalCartAmount() + 0 , //here we can add delivery/convinience fee also if needed 
    }  
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}}) 
    if(response.data.success){
      const {session_url} = response.data ;
      window.location.replace(session_url) ;

    }
    else{
      toast.error("Something Went Wrong") 
      // alert("error");
    }
  }


   return (

    <form onSubmit={placeOrder} className="place-order">
      <ToastContainer />
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='Name' onChange = {onChangeHandler} value={data.Name} type="text" placeholder = 'Name' />
          {/* <input required name='lastName' onChange = {onChangeHandler} value={data.lastName} type="text" placeholder='Last name' /> */}
        </div>
        {/* <input  required name='email' onChange = {onChangeHandler} value={data.email} type="text" placeholder='Email address' />
        <input required='true' name='street' onChange = {onChangeHandler} value={data.street} type="text" placeholder='Street'/> */}
        {/* <div className="multi-fields">
          <input required name='city' onChange = {onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required  name='state' onChange = {onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div> */}
        {/* <div className="multi-fields">
          <input  required name='zipcode' onChange = {onChangeHandler} value={data.zipcode} type="text" placeholder='zipcode' />
          <input required name='country' onChange = {onChangeHandler} value={data.country} type="text" placeholder='country' />
        </div> */}
        <input required name='phone' onChange = {onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
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
            <b>{getTotalCartAmount()+0}</b>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Order
