import React from 'react';

const StatisticsLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center p-20 ">
      <div className="bg-blue-200 rounded-lg shadow-xl p-10">
        <h2 className="text-2xl font-semibold text-blue-800 text-center">Total Sales</h2>
        <p className="text-4xl font-bold mt-2 text-center">$1,234</p>
      </div>
      <div className="bg-green-200 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-green-800 text-center">Total Orders</h2>
        <p className="text-4xl font-bold mt-2 text-center">567</p>
      </div>
      <div className="bg-yellow-200 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-yellow-800 text-center">Revenue</h2>
        <p className="text-4xl font-bold mt-2 text-center">$5,678</p>
      </div>
      <div className="bg-pink-200 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-pink-800 text-center">Customers</h2>
        <p className="text-4xl font-bold mt-2 text-center">123</p>
      </div>
    </div>
  );
};

export default StatisticsLayout;
