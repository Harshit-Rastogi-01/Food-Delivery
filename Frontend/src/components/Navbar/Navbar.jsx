import React ,{useState , useContext }from 'react'
import {useNavigate} from 'react-router-dom'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const[menu,setMenu]=useState("home");
  const{getTotalCartAmount , token ,setToken } =useContext(StoreContext);
  const navigate = useNavigate();
  const logout=() =>{
    localStorage.removeItem("token") ;
    setToken("");
    navigate("/") ;

  }

  return (
    <div className='navbar'>
    <Link to="/"><img src={assets.logo1} alt="" className="logo" />
    </Link>
    <ul className="navbar-menu">
      <Link to="/" onClick={()=>setMenu("home")} className = {menu=="home" ?  "active":""}>Home</Link>
      {/* here we linked our home page to home icon on navbar , whereas we use <a href=""></a> in explore-menu & contact-us to remain on the different part of same page */}
      <a href="#explore-menu" onClick={()=>setMenu("menu")} className = {menu=="menu"?"active":""}>Menu</a>
      {/* <li onClick={()=>setMenu("mobile-app")}  className = {menu=="mobile-app"?"active":""}>Mobile-App</li> */}
      <a href="#footer"onClick={()=>setMenu("contact-us")} className = {menu=="contact-us"?"active":""}>Contact Us</a>
    </ul>
    <div className="navbar-right">
      <img src={assets.search_icon} alt="" />
      <div className="navbar-search-icon">
        <Link to='/cart'> <img src={assets.basket_icon} alt=" " /></Link>
        {/* here we are link our cart page with the basket_icon */}
        <div className ={getTotalCartAmount()===0 ?"":"dot"}></div>
      </div>
      
      {!token? <button onClick = {()=>setShowLogin(true)} > Sign In </button> 
      : <div className='navbar-profile'>
        <img src={assets.profile_icon} alt="" />
        <ul className="navbar-profile-dropdown">
        <li> 
          <img src={assets.bag_icon} alt=''/>
          <p>Orders</p>
        </li>
        <hr/>
        <li> 
          <img onClick={logout} src={assets.logout_icon} alt=''/>
          <p>Logout</p>
        </li> 
        </ul>
        </div> }
      {/* here we  are setting are showLogin function = true by clicking on the sign-in button  which is then passed as props to our app.jsx file , which then checks whether thisis ture or false : if it is true then  loginPopUp.jsx file is displayed */}
    </div>
    </div>
  )
}

export default Navbar
