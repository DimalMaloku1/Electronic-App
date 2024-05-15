const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor');
const Device = require('../models/device');

// Get all sensors
router.get('/', async (req, res) => {
  try {
    const sensors = await Sensor.find().populate('device');
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one sensor
router.get('/:id', getSensor, (req, res) => {
  res.json(res.sensor);
});

// Create a sensor
router.post('/', async (req, res) => {
  const sensor = new Sensor({
    name: req.body.name,
    value: req.body.value,
    device: req.body.device
  });
  try {
    const newSensor = await sensor.save();
    res.status(201).json(newSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a sensor (PUT method)
router.put('/:id', getSensor, async (req, res) => {
  try {

    if (req.body.name != null) {
      res.sensor.name = req.body.name;
    }
    if (req.body.value != null) {
      res.sensor.value = req.body.value;
    }
    if (req.body.device != null) {
      res.sensor.device = req.body.device; 
    }

    // Save the updated sensor
    const updatedSensor = await res.sensor.save();
    res.json(updatedSensor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Middleware function to get sensor by ID
async function getSensor(req, res, next) {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: 'sensor not found' });
    }
    res.sensor = sensor; 
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete a sensor
router.delete('/:id', getSensor, async (req, res) => {
  try {
    await Sensor.deleteOne({ _id: req.params.id }); 
    res.json({ message: 'sensor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;