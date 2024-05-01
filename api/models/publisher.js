// models/author.js

const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthYear: Date
}, { collection: 'my_custom_publishers' }); // Specify custom collection name

module.exports = mongoose.model('Publisher', publisherSchema);
