import React from 'react';

const OrderTable = () => {
  const orders = [
    {
      email: 'example1@example.com',
      products: [
        { name: 'Product 1', price: 10, quantity: 2 },
        { name: 'Product 2', price: 15, quantity: 1 },
      ],
      totalPrice: 35,
    },
    {
      email: 'example2@example.com',
      products: [
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
        
      ],
      totalPrice: 86,
    },
    {
      email: 'example2@example.com',
      products: [
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
      ],
      totalPrice: 86,
    },
    {
      email: 'example2@example.com',
      products: [
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
      ],
      totalPrice: 86,
    },
    {
      email: 'example2@example.com',
      products: [
        { name: 'Product 3', price: 20, quantity: 3 },
      ],
      totalPrice: 86,
    },
    {
      email: 'example2@example.com',
      products: [
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
      ],
      totalPrice: 86,
    },
    {
      email: 'example2@example.com',
      products: [
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
      ],
      totalPrice: 86,
    },
    {
      email: 'example2@example.com',
      products: [
        { name: 'Product 3', price: 20, quantity: 3 },
        { name: 'Product 4', price: 12, quantity: 2 },
        { name: 'Product 4', price: 12, quantity: 2 },

      ],
      totalPrice: 86,
    },
    // Add more orders as needed
  ];

  const handleConfirm = (email) => {
    // Handle confirm button click for the given email
    console.log(`Confirmed order for email: ${email}`);
  };

  const handleRefuse = (email) => {
    // Handle refuse button click for the given email
    console.log(`Refused order for email: ${email}`);
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
