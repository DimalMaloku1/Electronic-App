const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Refers to the Author model
    required: false // Allows null values
  }
}, { collection: 'my_custom_blog_posts' }); // Specify custom collection name

module.exports = mongoose.model('BlogPost', blogPostSchema);
