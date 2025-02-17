import { createContext, useEffect, useState } from "react";
// import { food_list  } from "../assets/assets";
import axios from 'axios' ;
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [ordersData,setOrdersData] = useState({});
    const url = "http://localhost:4000" ; //backend url
    const [token,setToken] = useState("") ;
    const [food_list,setFoodlist] = useState([]) ; // here we initialized our food list with an empty string 


    const addToCart = async (itemId) =>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(url+"/api/cart/add" ,{itemId},{headers:{token}}) //when data is added to cart then it is being updated in Db as well
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        await axios.post(url+"/api/cart/remove" ,{itemId},{headers:{token}}) // when data is removed from cart then is also being updated in the cart as well

    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === (item));
            totalAmount += itemInfo.price * cartItems[item];
          }
        }
        return totalAmount;
      }

    const placeOrder = (deliveryData) =>{
        console.log(deliveryData);
    }
    
    const fetchFoodList  = async () =>{
        const response = await axios.get(url+"/api/food/list") ;
        setFoodlist (response.data.data);
    }

    const loadCartData = async(token) => {
        const response = await axios.post(url+"/api/cart/get" , {} ,{headers:{token}});
        setCartItems(response.data.cartData) ; //when page is reloaded then it does get refreshed
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token")) ; // this ensure when we reload the webpage then we are not loggedout
                await loadCartData(localStorage.getItem("token")) ;
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        // menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        url,
        token,
        setToken 

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        )

}

export default StoreContextProvider;