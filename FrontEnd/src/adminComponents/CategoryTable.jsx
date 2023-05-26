import React, { useEffect, useState } from 'react';

const CategoryTable = () => {
  const [category, setcategory] = useState([]);

  useEffect(() => {
    fetchcategory();
  }, []);

  const fetchcategory = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products'); // Replace with your API endpoint
      const data = await response.json();
      setcategory(data);
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
            <th className="py-2 px-4 border-b">Category Name</th>
           
          </tr>
        </thead>
        <tbody>
          {category.map(category => (
            <tr key={category.id}>
              <td className="py-2 px-4 border-b">{category.id}</td>
              <td className="py-2 px-4 border-b">{category.title}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
