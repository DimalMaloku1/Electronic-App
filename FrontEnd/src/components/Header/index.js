import React from 'react'
import { Link } from 'react-router-dom'

const navigations = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Products',
    path: '/products'
  },
  {
    name: 'About Us',
    path: '/aboutus'
  },
  {
    name: 'Contact Us',
    path: '/contact'
  },
  {
    name: 'My Account',
    path: '/userpage'
  },
  {
    name: 'AdminTesting',
    path: '/dashboard'
  }
]
const handleLogout = () => {
  // Remove the JWT token from local storage
  localStorage.removeItem('jwttoken');

  // Remove the username from local storage
  localStorage.removeItem('username');

  // Redirect to the home page
  window.location.href = '/';
}
const Header = () => {
  
  return (
    <header className="text-gray-600 body-font shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={'/'} className="flex items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Electronic Ecommerce</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {navigations.map((navigation) => (
            <Link
              key={navigation.path}
              to={navigation.path}
              className="mr-5 hover:text-gray-900"
            >
              {navigation.name}
            </Link>
          ))}
        </nav>
        <Link
          to={'/cart'}
          className="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0"
        >
          Cart
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        <Link
          to={'/wishlist'}
          className="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0 ml-4"
        >
          Wishlist
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        <Link
          to={'/login'}
          className="inline-flex items-center text-white bg-sky-600 border-0 py-2 px-4 focus:outline-none hover:bg-teal-300 rounded text-base mt-4 md:mt-0 ml-10"
        >
          Login
        </Link>
        <button className='inline-flex items-center text-white bg-red-600 border-0 py-2 px-4 focus:outline-none hover:bg-red-300 rounded text-base mt-4 md:mt-0 ml-10' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header
