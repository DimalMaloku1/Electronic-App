import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetchproducts();
  }, []);

  const fetchproducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products'); // Replace with your API endpoint
      const data = await response.json();
      setproducts(data);
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
          {products.map(products => (
            <tr key={products.id}>
              <td className="py-2 px-4 border-b">{products.id}</td>
              <td className="py-2 px-4 border-b">{products.title}</td>
              <td className="py-2 px-4 border-b">{products.price}</td>
              <td className="py-2 px-4 border-b">{products.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
