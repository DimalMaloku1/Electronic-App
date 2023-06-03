import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StackedBarChart = () => {
  // Dummy data for demonstration
  const salesData = [
    { month: 'January', sales: 500 },
    { month: 'February', sales: 750 },
    { month: 'March', sales: 300 },
    { month: 'April', sales: 900 },
    { month: 'May', sales: 600 },
    { month: 'June', sales: 1200 },
    { month: 'July', sales: 800 },
    { month: 'August', sales: 400 },
    { month: 'September', sales: 1100 },
    { month: 'October', sales: 950 },
    { month: 'November', sales: 700 },
    { month: 'December', sales: 1000 },
  ];

  return (
    <div>
      <h2>Sales From January To May 2023 Chart</h2>
      <BarChart width={800} height={400} data={salesData}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="rgba(50, 100, 255, 0.5)" />
      </BarChart>
    </div>
  );
};

export default StackedBarChart;
