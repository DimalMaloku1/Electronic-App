const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware to allow requests from different origins

// MongoDB Atlas connection string
const connectionString = 'mongodb+srv://AndiMongo:Zazamongo@andicluster.x3fpaon.mongodb.net/testdb';

// Connect to MongoDB Atlas
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {  
  console.log(`Connected to MongoDB Atlas http://localhost:${PORT}`);
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Models
const Author = require('./models/author');
const BlogPost = require('./models/blogPost');


// Routes
app.use('/api/authors', require('./routes/authorRoutes'));
app.use('/api/blogposts', require('./routes/blogPostRoutes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
