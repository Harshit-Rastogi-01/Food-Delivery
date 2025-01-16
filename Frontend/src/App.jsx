import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import {useState} from 'react'
const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  // intially we are assuming are setShowlogin function is false , which can be turned true by clicking on signUp
  // button of Navbar 
  return (
  <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>} 
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/order' element = {<Order/>} />
      </Routes>
    </div>
    <Footer />
  </>  
    
  )
}

export default App
