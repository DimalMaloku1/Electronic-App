const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device', // Refers to the Author model
    required: false // Allows null values
  }
}, { collection: 'my_custom_sensors' }); // Specify custom collection name

module.exports = mongoose.model('Sensor', sensorSchema);
