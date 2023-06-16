import React from 'react';

const CheckoutSuccess = () => {
  const email = 'example@example.com';
  const shipping = 'Standart Shipping';
  const adress = 'St prishtina 10000';
  const country = 'United States';
  const products = [
    { name: 'Product 1', price: 10, quantity: 2 },
    { name: 'Product 2', price: 15, quantity: 1 },
    { name: 'Product 3', price: 20, quantity: 3 },
  ];
  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg p-4 shadow-lg w-1/2">
        <h2 className="text-3xl font-semibold mb-6 text-center">Checkout Success</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-gray-700">{email}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Shipping </h3>
          <p className="text-gray-700">{shipping}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Street Adress </h3>
          <p className="text-gray-700">{adress}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Country</h3>
          <p className="text-gray-700">{country}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product.name} className="flex justify-between">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
                <p className="font-semibold">${product.price * product.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Total Price</h3>
          <p className="text-2xl font-bold">${totalPrice}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            href="/"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
