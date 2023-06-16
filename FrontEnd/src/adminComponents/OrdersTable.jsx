import React, { useEffect, useState } from 'react';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://localhost:7099/api/Checkout'); // Replace with your actual API endpoint
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleConfirm = (email) => {
    // Handle confirmation logic
    console.log(`Confirmed order for ${email}`);
  };

  const handleRefuse = (email) => {
    // Handle refusal logic
    console.log(`Refused order for ${email}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Address
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Country
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Products
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Total Price
            </th>
            <th className="py-3 px-6 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-4 px-6 border-b border-gray-300">{order.email}</td>
              <td className="py-4 px-6 border-b border-gray-300">{order.address}</td>
              <td className="py-4 px-6 border-b border-gray-300">{order.country}</td>
              <td className="py-4 px-6 border-b border-gray-300">
                <ol className="list-disc ml-4">
                  {order.products.map((product, productIndex) => (
                    <li key={productIndex}>
                      {product.name} (${product.price}) - Qty: {product.quantity}
                    </li>
                  ))}
                </ol>
              </td>
              <td className="py-4 px-6 border-b border-gray-300">${order.totalPrice}</td>
              <td className="py-4 px-6 border-b border-gray-300">
                <button
                  className="px-4 py-2 mr-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  onClick={() => handleConfirm(order.email)}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  onClick={() => handleRefuse(order.email)}
                >
                  Refuse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
