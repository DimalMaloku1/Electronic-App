import React, { useState, useEffect } from 'react';
import { FaChartLine, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa'
import StackedBarChart from './Charts/StackedBar';
import MostSold from './Charts/MostSold'

const StatisticsLayout = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0)

  useEffect(() => {
    // Fetch data from the API
    fetch('https://localhost:7099/api/Stats')
      .then(response => response.json())
      .then(data => {
        // Update state with the fetched data
        setTotalProducts(data.totalProducts);
        setTotalPrice(data.totalPrice);
        setTotalOrders(data.totalOrders);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const [totalIds, setTotalIds] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://localhost:7099/api/Account')
      .then(response => response.json())
      .then(data => {
        // Calculate the total number of IDs
        const count = data.length;
        setTotalIds(count);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center p-25 pb-20 pt-3" style={{ marginRight: '50px' }}>
      <div className="bg-blue-200 rounded-lg shadow-xl p-5 flex flex-col justify-center items-center">
        <FaChartLine size={64} color="#3B82F6" className="mb-4 ml-4" />
        <h2 className="text-3xl font-semibold text-blue-800 mb-2 text-center">Total Products</h2>
        <p className="text-5xl font-bold text-center">{totalProducts}</p>
      </div>
      <div className="bg-green-200 rounded-lg shadow-xl p-5 flex flex-col justify-center items-center">
        <FaShoppingCart size={64} color="#34D399" className="mb-4 ml-4" />
        <h2 className="text-3xl font-semibold text-green-800 mb-2 text-center">Total Orders</h2>
        <p className="text-5xl font-bold text-center">{totalOrders}</p>
      </div>
      <div className="bg-yellow-200 rounded-lg shadow-xl p-5 flex flex-col justify-center items-center">
        <FaDollarSign size={64} color="#FBBF24" className="mb-4 ml-4" />
        <h2 className="text-3xl font-semibold text-yellow-800 mb-2 text-center">Revenue</h2>
        <p className="text-5xl font-bold text-center">${totalPrice}</p>
      </div>
      <div className="bg-pink-200 rounded-lg shadow-xl p-5 flex flex-col justify-center items-center">
        <FaUsers size={64} color="#F87171" className="mb-4 ml-4" />
        <h2 className="text-3xl font-semibold text-pink-800 mb-2 text-center">Customers</h2>
        <p className="text-5xl font-bold text-center">{totalIds}</p>
      </div>
      <StackedBarChart />
      <br></br>
      <MostSold />
    </div>
  );
};

export default StatisticsLayout;
