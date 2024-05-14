import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPostEdit = () => {
  const { id } = useParams(); // Extract the blog post ID from the URL params
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogposts/${id}`); // Adjust the URL based on your backend endpoint
        const data = response.data;
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching blogpost:', error);
      }
    };
    fetchBlogPost();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/blogposts/${id}`, { title, content, author }); // Adjust the URL based on your backend endpoint
    } catch (error) {
      console.error('Error updating blogpost:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg">
  <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit BlogPost</h2>
  <form className="space-y-4">

    <div className="form-group">
      <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title:</label>
      <input type="text" id="title" className="form-control w-full px-4 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>

    <div className="form-group">
      <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content:</label>
      <textarea id="content" className="form-control w-full px-4 py-2" value={content} onChange={(e) => setContent(e.target.value)} />
    </div>
    
    <div className="form-group">
      <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author:</label>
      <input type="text" id="author" className="form-control w-full px-4 py-2" value={author} onChange={(e) => setAuthor(e.target.value)} />
    </div>

    <button type="button" className="btn btn-primary w-full py-2 px-4 bg-blue-500" onClick={handleSave}>Save</button>
  </form>
</div>

  );
};

export default BlogPostEdit;
