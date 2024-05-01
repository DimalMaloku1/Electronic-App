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

const Department = require('./models/department');
const Employee = require('./models/employee');


const Publisher = require('./models/publisher');
const Magazine = require('./models/magazine');

// Routes
app.use('/api/publishers', require('./routes/publisherRoutes'));
app.use('/api/magazines', require('./routes/magazineRoutes'));

app.use('/api/authors', require('./routes/authorRoutes'));
app.use('/api/blogposts', require('./routes/blogPostRoutes'));

app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
