const express = require('express');
const router = express.Router();
const Publisher = require('../models/publisher');

// Get all authors
router.get('/', async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one author
router.get('/:id', getPublisher, (req, res) => {
  res.json(res.publisher);
});

// Create an author
router.post('/', async (req, res) => {
  const publisher = new Publisher({
    name: req.body.name,
    surname: req.body.surname,
    birthYear: req.body.birthYear
  });
  try {
    const newPublisher = await publisher.save();
    res.status(201).json(newPublisher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an author (PUT method)
router.put('/:id', getPublisher, async (req, res) => {
  try {
    if (req.body.name != null) {
      req.publisher.name = req.body.name;
    }
    if (req.body.surname != null) {
      req.publisher.surname = req.body.surname;
    }
    if (req.body.birthYear != null) {
        req.publisher.birthYear = req.body.birthYear;
      }
    const updatedPublisher = await req.publisher.save();
    res.json(updatedPublisher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get author by ID
async function getPublisher(req, res, next) {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: 'publisher not found' });
    }
    req.publisher = publisher;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete an author
router.delete('/:id', getPublisher, async (req, res) => {
  try {
    await Publisher.deleteOne({ _id: req.publisher._id });
    res.json({ message: 'publisher deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
