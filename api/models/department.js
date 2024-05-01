// models/author.js

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: String,
  number: Number,
}, { collection: 'my_custom_departments' }); // Specify custom collection name

module.exports = mongoose.model('Department', departmentSchema);
