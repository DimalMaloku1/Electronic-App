import React from 'react';
import { Image, Typography } from 'antd';
import PfpImg from '../../assets/AdminPfp.png';

function AppHeader() {
  const isLoggedIn = !!localStorage.getItem('jwttoken'); // Check if a JWT token is present
  const username = localStorage.getItem('username'); // Get the username from local storage

  const handleLogout = () => {
    // Remove the JWT token and other data from local storage
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    // Redirect to the home page
    window.location.href = '/';
  };

  return (
    <div className="AppHeader">
      <Image width={40} src={PfpImg} />
      <Typography.Title>
        <div className="admin-title">Admin's Dashboard</div>
      </Typography.Title>
      {isLoggedIn && (
        <div className="flex items-center">
          <span className="mr-4 text-black text-lg">
            <span className=" inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white border border-indigo-600">
              Hello, <span className="font-bold">{username}</span>
            </span>
          </span>
          <button
            className="inline-flex items-center text-white bg-red-600 border-0 py-2 px-4 focus:outline-none hover:bg-red-300 rounded text-base mt-4 md:mt-0 ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AppHeader;
