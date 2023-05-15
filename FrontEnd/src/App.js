import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './modules/Home';
import { Routes, Route } from 'react-router-dom';
import Product from './modules/Product';
import Products from './modules/Products';
import CategoryProducts from './modules/CategoryProducts';
import Cart from './modules/Cart';
import WishList from './modules/WishList/WishList';
import AboutUs from './modules/AboutUs/AboutUs';
import Contact from './modules/Contact/Contact';
import Login from './modules/LoginRegister/Login'
import Register from './modules/LoginRegister/Register'

// Admin Navigation from here
import Dashboard from './modules/Admin/Dashboard'
import Adminproducts from './modules/Admin/Adminproducts'
import Categories from './modules/Admin/Categories'
import Messages from './modules/Admin/Messages'
import Orders from './modules/Admin/Orders'
import Statistics from './modules/Admin/Statistics'
import Users from './modules/Admin/Users' 


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:id" element={<Product/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/categories/:name" element={<CategoryProducts/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="/wishlist" element={<WishList/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/adminproducts" element={<Adminproducts/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/users" element={<Users/>} />

        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
