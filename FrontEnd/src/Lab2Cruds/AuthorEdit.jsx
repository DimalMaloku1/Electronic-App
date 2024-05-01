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
    <div className="container">
      <h2>Edit Author</h2>
      <form className="form">

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default AuthorEdit;
