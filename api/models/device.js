// models/author.js

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  displayName: String,
  location: String,
}, { collection: 'my_custom_devices' }); // Specify custom collection name

module.exports = mongoose.model('Device', deviceSchema);
