import React, { useState, useEffect } from 'react';

const StatisticsLayout = () => {
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.example.com/statistics')
      .then(response => response.json())
      .then(data => {
        // Update state with the fetched data
        setSales(data.totalSales);
        setOrders(data.totalOrders);
        setRevenue(data.revenue);
        setCustomers(data.totalCustomers);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center p-20">
      <div className="bg-blue-200 rounded-lg shadow-xl p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2 text-center">Total Sales</h2>
        <p className="text-4xl font-bold text-center">${sales}</p>
      </div>
      <div className="bg-green-200 rounded-lg shadow-xl p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-green-800 mb-2 text-center">Total Orders</h2>
        <p className="text-4xl font-bold text-center">{orders}</p>
      </div>
      <div className="bg-yellow-200 rounded-lg shadow-xl p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-yellow-800 mb-2 text-center">Revenue</h2>
        <p className="text-4xl font-bold text-center">${revenue}</p>
      </div>
      <div className="bg-pink-200 rounded-lg shadow-xl p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-pink-800 mb-2 text-center">Customers</h2>
        <p className="text-4xl font-bold text-center">{customers}</p>
      </div>
    </div>
  );
};

export default StatisticsLayout;
