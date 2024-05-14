const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');
const Author = require('../models/author');

// Get all blogposts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author');
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one blogpost
router.get('/:id', getBlogPost, (req, res) => {
  res.json(res.blogPost);
});

// Create a blogpost
router.post('/', async (req, res) => {
  const blogPost = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  try {
    const newBlogPost = await blogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a blogpost (PUT method)
router.put('/:id', getBlogPost, async (req, res) => {
  try {

    if (req.body.title != null) {
      res.blogPost.title = req.body.title;
    }
    if (req.body.content != null) {
      res.blogPost.content = req.body.content;
    }
    if (req.body.author != null) {
      res.blogPost.author = req.body.author; 
    }

    // Save the updated blogpost
    const updatedBlogPost = await res.blogPost.save();
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Middleware function to get blogpost by ID
async function getBlogPost(req, res, next) {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.blogPost = blogPost; 
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete a blogpost
router.delete('/:id', getBlogPost, async (req, res) => {
  try {
    await BlogPost.deleteOne({ _id: req.params.id }); 
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;