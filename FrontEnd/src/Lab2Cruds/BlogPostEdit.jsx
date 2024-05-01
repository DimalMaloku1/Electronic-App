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
        console.error('Error fetching blog post:', error);
      }
    };
    fetchBlogPost();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/blogposts/${id}`, { title, content, author }); // Adjust the URL based on your backend endpoint
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };
  

  return (
    <div className="container">
      <h2>Edit Blog Post</h2>
      <form className="form">

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        
        {/* If you want to allow editing the author as well */}
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default BlogPostEdit;
