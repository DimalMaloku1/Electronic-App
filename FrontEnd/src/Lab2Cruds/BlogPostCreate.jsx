import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/authors'); // Adjust the URL based on your backend endpoint
        setAuthors(data);
        if (data.length > 0) {
          // Set default author ID to the first author in the list
          setAuthorId(data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogposts', { title, content, author: authorId }); // Adjust the URL based on your backend endpoint
      // Optionally, you can handle success or navigate to a different page
    } catch (error) {
      console.error('Error creating blog post:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Create Blog Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          rows="4"
        ></textarea>
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        >
          {authors.map((author) => (
            <option key={author._id} value={author._id}>{author._id}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogPostCreate;
