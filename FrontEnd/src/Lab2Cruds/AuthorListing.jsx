import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthorListing = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/authors'); // Adjust the URL based on your backend endpoint
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthors();
  }, []);

  const handleDelete = async (authorId) => {
    try {
      await axios.delete(`http://localhost:5000/api/authors/${authorId}`);
      setAuthors(authors.filter(author => author._id !== authorId));
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };
  

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Authors</h2>
        <Link to="/authors/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          New Author
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">Author Id</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">Name</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">Email</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 uppercase border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {authors.map(author => (
            <tr key={author._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{author._id}</td>
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{author.name}</td>
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">{author.email}</td>
              <td className="px-4 py-2 whitespace-nowrap border border-gray-200">
                <Link to={`/authors/edit/${author._id}`} className="text-blue-600 hover:text-blue-800 mr-2">Edit</Link>
                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(author._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorListing;
