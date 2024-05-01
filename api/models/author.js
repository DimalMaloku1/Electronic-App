// models/author.js

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
}, { collection: 'my_custom_authors' }); // Specify custom collection name

module.exports = mongoose.model('Author', authorSchema);
