const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// Get all authors
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one author
router.get('/:id', getDepartment, (req, res) => {
  res.json(res.department);
});

// Create an author
router.post('/', async (req, res) => {
  const department = new Department({
    name: req.body.name,
    number: req.body.number
  });
  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an author (PUT method)
router.put('/:id', getDepartment, async (req, res) => {
  try {
    if (req.body.name != null) {
      req.department.name = req.body.name;
    }
    if (req.body.number != null) {
      req.department.number = req.body.number;
    }
    const updatedDepartment = await req.department.save();
    res.json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get author by ID
async function getDepartment(req, res, next) {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'department not found' });
    }
    req.department = department;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete an author
router.delete('/:id', getDepartment, async (req, res) => {
  try {
    await Department.deleteOne({ _id: req.department._id });
    res.json({ message: 'department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
