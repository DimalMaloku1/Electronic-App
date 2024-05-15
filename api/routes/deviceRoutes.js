const express = require('express');
const router = express.Router();
const Device = require('../models/device');

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one device
router.get('/:id', getDevice, (req, res) => {
  res.json(res.device);
});

// Create an device
router.post('/', async (req, res) => {
  const device = new Device({
    displayName: req.body.displayName,
    location: req.body.location
  });
  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an device (PUT method)
router.put('/:id', getDevice, async (req, res) => {
  try {
    if (req.body.displayName != null) {
      req.device.displayName = req.body.displayName;
    }
    if (req.body.location != null) {
      req.device.location = req.body.location;
    }
    const updatedDevice = await req.device.save();
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get device by ID
async function getDevice(req, res, next) {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    req.device = device;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete an device
router.delete('/:id', getDevice, async (req, res) => {
  try {
    await Device.deleteOne({ _id: req.device._id });
    res.json({ message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
