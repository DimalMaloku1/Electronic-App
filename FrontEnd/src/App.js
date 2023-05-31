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
import UserPage from './modules/UserAccount';

// Admin Navigation from here
import Adminproducts from './Admin/Adminproducts'
import Categories from './Admin/Categories'
import Dashboard from './Admin/Dashboard'
import Messages from './Admin/Messages'
import Orders from './Admin/Orders'
import Users from './Admin/Users'
import AdminReference from './Admin/AdminReference'
import ProductsListing from './Admin/ProductsListing';
import ProductsEdit from './Admin/ProductsEdit';
import ProductsCreate from './Admin/ProductsCreate';

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
        <Route path="/userpage" element = {<UserPage/>} />

        
        <Route path="/adminreference" element={<AdminReference/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/adminproducts" element={<Adminproducts/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/users" element={<Users/>} />

        <Route path='/productslisting' element={<ProductsListing />}></Route>
        <Route path='/products/create' element={<ProductsCreate />}></Route>
        <Route path='/products/edit/:productsid' element={<ProductsEdit />}></Route>

        <Route path="*" element={<div>404</div>} />

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
