import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorEdit = () => {
  const { id } = useParams(); // Extract the author ID from the URL params
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/authors/${id}`); // Adjust the URL based on your backend endpoint
        const author = response.data;
        setName(author.name);
        setEmail(author.email);
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/authors/${id}`, { name, email }); // Adjust the URL based on your backend endpoint
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
  <h2 className="text-xl font-bold mb-4">Edit Author</h2>
  <form className="space-y-4">

    <div>
      <label className="block text-sm font-medium mb-1" htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        className="w-full border-gray-900 rounded-md shadow-sm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1" htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        className="w-full border-gray-900 rounded-md shadow-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <button
      type="button"
      className="w-full bg-blue-500  text-white font-semibold py-2 rounded-md"
      onClick={handleSave}
    >
      Save
    </button>
    
  </form>
</div>

  );
};

export default AuthorEdit;
