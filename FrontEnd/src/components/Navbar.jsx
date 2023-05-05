import React from 'react'
import {Link} from "react-router-dom"
import { ShoppingCart } from 'phosphor-react'
import { ListPlus } from 'phosphor-react'
import { SignIn } from 'phosphor-react'
import { Chats } from 'phosphor-react'
import { Atom } from 'phosphor-react'
import './Navbar.css'

export const Navbar = () => {
  return (
    <div className='navbari'>
      <div className='links'>
       <Link to="/">Electronic Shop
       <Atom size={35} className='logo'/>
       </Link>
        <input type="text" name="search" className="search-bar" placeholder='Search...' />
       <Link to="/cart" >
        <ShoppingCart size={35} className='logo' />
       </Link>
       <Link to="/wishlist">
        <ListPlus size={35} className='logo' />
       </Link>
       <Link to="signup">
        <SignIn size={35} className='logo' />
       </Link>
       <Link to="contact">
        <Chats size={35} className='logo' />
       </Link>
      <Link to='dashboard'>AdminTest</Link>
      </div>
    </div>
  )
}











/*const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src="path/to/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="navbar__search">
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </div>
      <div className="navbar__links">
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="navbar__menu">
        <div className="navbar__menu--icon"></div>
      </div>
    </nav>
  );
};

export default Navbar;

*/
