const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const Department = require('../models/department');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one blog post
router.get('/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// Create a blog post
router.post('/', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    surname: req.body.surname,
    birthYear: req.body.birthYear,
    department: req.body.department
  });
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a blog post (PUT method)
router.put('/:id', getEmployee, async (req, res) => {
  try {
    // Update the blog post fields
    if (req.body.name != null) {
      res.employee.name = req.body.name;
    }
    if (req.body.surname != null) {
      res.employee.surname = req.body.surname;
    }
    if (req.body.birthYear != null) {
        res.employee.birthYear = req.body.birthYear;
      }
    if (req.body.department != null) {
      res.employee.department = req.body.department; // Update the author ID
    }

    // Save the updated blog post
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Middleware function to get blog post by ID
async function getEmployee(req, res, next) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'employee not found' });
    }
    res.employee = employee; // Assign blog post instance to res.blogPost
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete a blog post
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params.id }); // Delete the blog post by ID
    res.json({ message: 'employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;