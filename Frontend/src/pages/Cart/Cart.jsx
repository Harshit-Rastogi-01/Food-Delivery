import React from 'react'
import {useContext }from 'react'
import {useNavigate} from 'react-router-dom'
import './Cart.css'
import {StoreContext } from '../../Context/StoreContext'
const Cart = () => {
  const {cartItems,food_list ,  removeFromCart , getTotalCartAmount ,url } = useContext (StoreContext);
 const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br></br>
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div>
                <div className="cart-items-title cart-items-item">
                  {/* <p>{item.name}</p> */}
                  <img src={url+"/images/"+item.image} />
                  <p>{item.name}</p>
                  <p><i className="fa fa-inr " aria-hidden="true"></i> {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p><i className="fa fa-inr " aria-hidden="true"></i> {item.price*cartItems[item._id]}</p>
                  <p className="cross" onClick={()=>removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
        <br />
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p> <i className="fa fa-inr" aria-hidden="true"></i> {getTotalCartAmount()}</p>
            
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{0}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b> <i className="fa fa-inr" aria-hidden="true"></i> {getTotalCartAmount()+0}</b>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        
      </div>

    </div>
  )
}

export default Cart
