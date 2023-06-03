import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MostSold = () => {
  // Dummy data for demonstration
  const techSalesData = [
    { month: 'January', product: 'Apple iPhone 14 Pro', sales: 200 },
    { month: 'February', product: 'MacBook Pro 16', sales: 270 },
    { month: 'March', product: 'Razer DeathAdder V2', sales: 180 },
    { month: 'April', product: 'Apple iPhone 14 Pro', sales: 120 },
    { month: 'May', product: 'Nikon D3500', sales: 250 },
    { month: 'June', product: 'Apple Watch Series 8', sales: 130 },
    { month: 'July', product: 'MacBook Pro 16', sales: 300 },
    { month: 'August', product: 'Alienware 500Hz Gaming Monitor', sales: 220 },
    { month: 'September', product: 'SteelSeries Arctis 7', sales: 300 },
    { month: 'October', product: 'Asus Zenbook Pro Duo 14', sales: 350 },
    { month: 'November', product: 'OnePlus Nord N20 5G', sales: 280 },
    { month: 'December', product: 'Samsung Galaxy A54 5G', sales: 240 },
  ];

  const uniqueMonths = Array.from(new Set(techSalesData.map(item => item.month)));

  const filteredData = uniqueMonths.map(month => {
    const monthData = techSalesData.find(item => item.month === month);
    return { month: monthData.month, product: monthData.product, sales: monthData.sales };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">{data.product}</p>
          <p className="value">Sales: {data.sales}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>Most Sold Product by Month And Its Total Sales</h2>
      <BarChart width={800} height={400} data={filteredData}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="sales" fill="rgba(197, 211, 75, 0.5)" />
      </BarChart>
    </div>
  );
};

export default MostSold;
