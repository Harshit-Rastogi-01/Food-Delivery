import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id ,name,price,description ,image}) => {
  const [itemCount,setItemCount] = useState(0);  
  // for item count 
    const{cartItems,addToCart , removeFromCart} = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt='' />
        {
          //Condition: If itemCount is 0 (or falsy), display an "Add" icon.
          //!itemCount: This means "if itemCount is zero or undefined" 
          // ------previous code below with above explanantion --------------------------------------------------------------------------------------------
          // !itemCount
          //  ? <img  className="add" onClick = { ()=> setItemCount(prev => prev + 1) } src={assets.add_icon_white} alt="" /> 
          //  : <div className="food-item-counter">
          //      <img  onClick = { ()=> setItemCount(prev => prev - 1) } src={assets.remove_icon_red} alt="" /> 
          //      {/* this above icon is for removing item */ }
          //      <p>{itemCount}</p>
          //      <img  onClick = { ()=> setItemCount(prev => prev + 1) } src={assets.add_icon_green} alt=""/> 
          //      {/* this above icon is for adding item */}
          //    </div> 

          !cartItems[id]
            ?<img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" /> 
            // above is the + icon for adding 
            :<div className="food-item-counter">
              <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
              <p>{cartItems[id]}</p>
              <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
            </div>    
        }
      </div>
      <div className="food-item-info">
        <div className= "food-item-name-rating" >
          <p>{name}</p>
          {/* <img src={assets.rating_starts} alt=""/> */}

        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">
        <i className="fa fa-inr" aria-hidden="true">  </i>
         <span >
           {price}
         </span>
        </p>
      </div>
    </div>
  )
}

export default FoodItem