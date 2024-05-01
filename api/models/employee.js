const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  birthYear: {
    type: Date,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', // Refers to the Author model
    required: false // Allows null values
  }
}, { collection: 'my_custom_employees' }); // Specify custom collection name

module.exports = mongoose.model('Employee', employeeSchema);
