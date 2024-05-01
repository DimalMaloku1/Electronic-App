const express = require('express');
const router = express.Router();
const Magazine = require('../models/magazine');
const Publisher = require('../models/publisher');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const magazines = await Magazine.find().populate('publisher');
    res.json(magazines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one blog post
router.get('/:id', getMagazine, (req, res) => {
  res.json(res.magazine);
});

// Create a blog post
router.post('/', async (req, res) => {
  const magazine = new Magazine({
    number: req.body.number,
    name: req.body.name,
    type: req.body.type,
    publisher: req.body.publisher
  });
  try {
    const newMagazine = await magazine.save();
    res.status(201).json(newMagazine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a blog post (PUT method)
router.put('/:id', getMagazine, async (req, res) => {
  try {
    // Update the blog post fields
    if (req.body.number != null) {
      res.magazine.number = req.body.number;
    }
    if (req.body.name != null) {
      res.magazine.name = req.body.name;
    }
    if (req.body.type != null) {
        res.magazine.type = req.body.type;
      }
    if (req.body.publisher != null) {
      res.magazine.publisher = req.body.publisher; // Update the author ID
    }

    // Save the updated blog post
    const updatedMagazine = await res.magazine.save();
    res.json(updatedMagazine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Middleware function to get blog post by ID
async function getMagazine(req, res, next) {
  try {
    const magazine = await Magazine.findById(req.params.id);
    if (!magazine) {
      return res.status(404).json({ message: 'magazine not found' });
    }
    res.magazine = magazine; // Assign blog post instance to res.blogPost
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete a blog post
router.delete('/:id', getMagazine, async (req, res) => {
  try {
    await Magazine.deleteOne({ _id: req.params.id }); // Delete the blog post by ID
    res.json({ message: 'magazine deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;