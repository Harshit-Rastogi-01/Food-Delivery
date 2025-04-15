# Grab & Go 
A Food Ordering System for SeamLess Meal Pickup .

## Live Demo : 
- You can checkout the Live Preview of the Project here (https://food-delivery-frontend-m5al.onrender.com).
- For Admin (https://food-delivery-admin-40z6.onrender.com).

## Table of Contents

- About the Project
- Features 
- Objectives 
- Technology Used
- Getting Started 
- Installation
- Enviorment Variables 
- Usage
- Feedback
- References
## About the Project
**Grab & Go** is an online food ordering system tailored for college canteens, aiming to streamline the ordering process and tackle common issues like overcrowding, long wait times, and inefficient order management—especially during peak hours.

This web-based platform allows users to:

- Place orders online directly from the canteen menu.
- Receive real-time updates on their order status, reducing the need for physical queuing and offers a more organized and convinient dining experience .
- Estimate waiting times before placing an order.
- Get notified when their food is **ready for pickup**.

This system not only enhances user experience but also enables canteen staff to manage orders efficiently without the chaos of large crowds. 
## Features

- User Registration (Name ,Email , Password) .
- Password Encryption for Security reasons .
- User Login .
- Sort menu-items based on Categories (North-Indian , Beverages , Desserts,etc)
- Add/Remove items from the cart .
- Real-time order tracking for User as provided by Canteen Admin .
- Secure payments via Razorpay (UPI & Cards) .
- Admin panel for adding/removing menu items .
- Clean , Responsive design for various screen sizes (Mobile & Desktop) .


## Objectives
**Objective 1 : Canteen-Side Data Management Interface -** Build an interface for canteen staff to manage menu items, prices, availability, and estimated wait times. Allow real-time updates for item availability and preparation times to keep the menu accurate for customers.

**Objective 2: Customer-Side Ordering Interface -** Develop an easy-to-use interface for customers to browse menus, customize orders, place items in their cart and enable real-time order tracking on the customer side, displaying status updates (e.g., “Order Received,” “Preparing,” “Ready for Pickup”).

**Objective 3: Payment gateway -** Integrate a secure payment gateway (such as Razorpay or PayPal) to facilitate online payments directly through the platform.

## Technology Used

**Frontend:** React.js , 
**Backend:** Node.js, Express.js  ,
**Database:** MongoDB (NoSQL) ,
**Payment Gateway:** RazorPay .



## Getting Started

**Prerequisites:**
- Node.js & npm
- MongoDB

Clone the Repository to your system .
```bash
git clone https://github.com/Harshit-Rastogi-01/Food-Delivery.git
cd Food-Delivery
```
## Installation

Install **Grab & GO** with npm. (Node Package Manager)

Install dependencies for both frontend & backend :

**backend**
```bash
  cd backend
  npm install
```
**frontend**
```bash
  cd ../frontend
  npm install
```
    
## Environment Variables
Create a .env file in the backend, frontend directory and add the following:



**Backend .env**

`MONGO_URL=your_mongo_connection_string`
`RAZORPAY_KEY_ID=your_razorpay_key`
`RAZORPAY_KEY_SECRET=your_razorpay_secret`



**Frontend .env**

`RAZORPAY_KEY_ID=your_razorpay_key`
## Usage 

**backend**

This starts the backend server .

```backend
cd backend
npm run server
```


**frontend**

Open an integrated terminal , keeping the backend server started.
```
cd frontend
npm run dev
```

**admin**

Open an integrated terminal , keeping the backend server started .
```
cd admin
npm run dev
```
## Feedback

If you have any feedback, please reach out to me at  harshitrastogi0206@gmail.com


## References

1.	MDN Web Docs. (n.d.). Express.js. Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Express
2.	ReactJS Documentation. (n.d.). React. Retrieved from https://reactjs.org/docs/getting-started.html
3.	MongoDB Documentation. (n.d.). MongoDB Compass. Retrieved from https://www.mongodb.com/products/compass
4.	Razorpay. (n.d.). Razorpay Payment Integration. Retrieved from https://razorpay.com/docs/
5.	Postman. (n.d.). Postman API Testing. Retrieved from https://www.postman.com/




