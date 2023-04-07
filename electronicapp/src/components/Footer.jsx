import React from 'react'

const Footer = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <div className="logo">Logo</div>
      </div>
      <div className="navbar__search">
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </div>
      <div className="navbar__links">
        <div>About</div>
        <div>Cart</div>
        <div>WishList</div>
        <div>Login</div>
        <div>Contact Us</div>
      </div>
    </nav>
  )
}

export default Footer