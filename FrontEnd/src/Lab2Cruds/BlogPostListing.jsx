import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogPostListing = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const [titleFilter, settitleFilter] = useState('');
  const [filteredBlogPosts, setFilteredBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogPostsResponse = await axios.get('http://localhost:5000/api/blogposts');
        setBlogPosts(blogPostsResponse.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (blogPostId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogposts/${blogPostId}`);
      setBlogPosts(blogPosts.filter(blogPost => blogPost._id !== blogPostId));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };


  //filter 
  useEffect(() => {
    if (titleFilter) {
      const filtered = blogPosts.filter(blogPost => blogPost.title.includes(titleFilter));
      setFilteredBlogPosts(filtered);
    } else {
      setFilteredBlogPosts(blogPosts);
    }
  }, [titleFilter, blogPosts]);

  const handleFilter = (event) => {
    settitleFilter(event.target.value);
  };


  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold mb-2">Blog Posts</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter type to Filter"
          value={titleFilter}
          onChange={handleFilter}
          className="border border-gray-300 rounded-md p-2"
        />
        <Link to="/blogposts/new" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          New Blog Post
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                Blog Post Id
              </th>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                Title
              </th>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                Content
              </th>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                Author Name
              </th>
              <th className="px-2 py-1 text-sm font-medium text-gray-700 uppercase border border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBlogPosts.map(blogPost => (
              <tr key={blogPost._id} className="hover:bg-gray-50">
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{blogPost._id}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{blogPost.title}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{blogPost.content}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <div className="text-sm text-gray-800">{blogPost.author ? blogPost.author.name : "Author has been deleted"}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap border border-gray-200">
                  <Link to={`/blogposts/edit/${blogPost._id}`} className="text-blue-600 hover:text-blue-800 mr-1">Edit</Link>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(blogPost._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPostListing;