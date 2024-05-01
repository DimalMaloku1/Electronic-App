const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher', // Refers to the Author model
    required: false // Allows null values
  }
}, { collection: 'my_custom_magazines' }); // Specify custom collection name

module.exports = mongoose.model('Magazine', magazineSchema);
