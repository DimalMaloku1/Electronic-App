import React, { useEffect, useState } from 'react';

const OrderTable = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    fetchorders();
  }, []);

  const fetchorders = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products'); // Replace with your API endpoint
      const data = await response.json();
      setorders(data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  return (
    <div className="max-w-1x1 mx-1 p-1">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(orders => (
            <tr key={orders.id}>
              <td className="py-2 px-4 border-b">{orders.id}</td>
              <td className="py-2 px-4 border-b">{orders.title}</td>
              <td className="py-2 px-4 border-b">{orders.price}</td>
              <td className="py-2 px-4 border-b">{orders.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
