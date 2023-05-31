import React from 'react';
import userpfp from '../../assets/userpfp.png'

const UserPage = () => {
  // User data
  const user = {
    image: 'path/to/user/image.jpg',
    name: 'John Doe',
    email: 'john.doe@example.com',
    purchaseHistory: [
      { id: 1, item: 'Product A', date: '2022-01-01', amount: 10, price: 5 },
      { id: 2, item: 'Product B', date: '2022-02-05', amount: 20, price: 8 },
      { id: 3, item: 'Product C', date: '2022-03-10', amount: 30, price: 12 },
    ],
  };

  // Calculate total amount spent
  const totalAmountSpent = user.purchaseHistory.reduce(
    (total, purchase) => total + purchase.amount,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={userpfp}
          alt="User"
          className="w-32 h-32 rounded-full mb-4 md:mr-8"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8">Purchase History</h3>
      <ul className="mt-4">
        {user.purchaseHistory.map((purchase) => (
          <li
            key={purchase.id}
            className="flex flex-col md:flex-row items-center justify-between py-2 border-b border-gray-300"
          >
            <div className="mb-2 md:mb-0 space-x-5">
              <span className="font-semibold">{purchase.item}</span>
              <span className="text-gray-500">Price: ${purchase.price}</span>
            </div>
            <div className="text-gray-500 space-x-5">
              <span>Quantity: {purchase.amount}</span>
              <span>{purchase.date}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Money Spent</h3>
        <p className="text-gray-500">Total amount spent: ${totalAmountSpent}</p>
      </div>
    </div>
  );
};

export default UserPage;
