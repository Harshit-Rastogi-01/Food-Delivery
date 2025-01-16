import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {
// this LoginPopup function works only if the setShowLogin is true  
    const [currState,setCurrState] = useState("Login");

  return (
    <div className='login-popup'>
        <form className="login-popup-container">

            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                {/* here by clicking the img : cross_icon the setShowLogin becomes false  */}
            </div>

            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type="text" placeholder='Your name'  required />}
                {/* if the currState is login then do not show  Your Name ,
                whereas if it is Sign Up then show the your name text field also
                and this currState = Login , or currState = Sign Up  , set through the <p></p> below by clicking on it .  */}
                <input type="email" placeholder='Your email' required />
                <input type="password" placeholder='Password' required/>
            </div>

            <button>{currState==="Sign Up"?"Create account":"Login"}</button>

            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" />
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>

            {currState==="Login"
            // if the state is set to login then show the first - p tag (which is by default also) , else show the second p tag .
                ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
                :<p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup
