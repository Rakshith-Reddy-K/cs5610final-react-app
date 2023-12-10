import React from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import ProductDetails from "./ProductDetails";
import Home from "./Home";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./Login"
import Register from "./Signup"
import { AuthProvider } from "./Home/AuthContext"; 
import Cart from "./Cart";
import SellerProfile from './Profile/SellerProfile'
import BuyerProfile from './Profile/BuyerProfile'

import Admin from "./Admin";
import NavBar from "./Navbar";
import Seller from "./Seller";
function App() {
  return (
    <div style={{backgroundColor:"floralWhite"}}>
    <Provider store={store}>
      <HashRouter>
        <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/seller" element={<Seller/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Home" element={<Home />} />
            <Route path="/details/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/sellerProfile/:sellerId" element={<SellerProfile/>} />
            <Route path="/profile/:userId" element={<BuyerProfile/>}/>
          </Routes>
        </AuthProvider>
        </div>
      </HashRouter>
    </Provider>
    </div>
  );
}

export default App;
