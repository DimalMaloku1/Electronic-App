import React, { useEffect, useState } from 'react';
import userpfp from '../../assets/userpfp.png';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
 

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    } 
  });

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://localhost:7099/api/Checkout');
        if (response.ok) {
          const data = await response.json();
          // Filter userData based on the logged-in user's email
          const filteredData = data.filter((purchase) => purchase.email === user);
          setUserData(filteredData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
        // Handle error state or display an error message
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!user) {
    // Render loading state or redirect if user data is not available
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-3xl mb-4">Sign In To See Your Account Data...</p>
            <Link
              to="/login"
              className="inline-block bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={userpfp}
            alt="User"
            className="w-32 h-32 rounded-full mb-4 md:mr-8"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{user}</h2>
            <p className="text-gray-500">{user}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">Purchase History</h3>
        {userData && userData.length > 0 ? (
          <ul className="mt-4">
            {userData.map((purchase) => (
              <li
                key={purchase.id}
                className="flex flex-col md:flex-row items-center justify-between py-2 border-b border-gray-300"
              >
                <div className="mb-2 md:mb-0 space-x-5">
                  <span className="font-semibold">{purchase.products[0].name}</span>
                  <span className="text-gray-500">
                    Price: ${purchase.products[0].price}
                  </span>
                </div>
                <div className="text-gray-500 space-x-5">
                  <span>Quantity: {purchase.products[0].quantity}</span>
                  <span>{purchase.date}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No purchase history available.</p>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold">Money Spent</h3>
          {userData && userData.length > 0 ? (
            <p className="text-gray-500">
              Total amount spent: ${userData.reduce(
                (total, purchase) => total + purchase.totalPrice,
                0
              )}
            </p>
          ) : (
            <p className="text-gray-500">No purchase history available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
