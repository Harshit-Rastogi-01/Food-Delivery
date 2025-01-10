import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Welcome to TOMATO , your go-to solution for satisfying cravings on campus. We make it easy to enjoy your favorite canteen dishes with just a few taps, ensuring fresh and fast delivery. Because you deserve great food and convenience, every single day!</p>
            
        </div>
        {/* <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div> */}
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-9759839770</li>
                <li>+91-8392911565</li>
                <li>contact@tomato.com</li>
                <li>harshitrastogi0206@gmail.com</li>
                <li>maurvigupta17@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © Tomato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
