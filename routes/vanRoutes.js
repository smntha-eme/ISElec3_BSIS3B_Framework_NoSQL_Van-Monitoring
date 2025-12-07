const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // needed for ObjectId check
const Van = require('../models/van');

// GET /vans → return all vans
router.get('/', async (req, res) => {
  try {
    const vans = await Van.find();
    res.json(vans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /vans/:id/status → update van status
router.put('/:id/status', async (req, res) => {
  const vanId = req.params.id;
  const { status } = req.body;

  // 1. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(vanId)) {
    return res.status(400).json({ error: "Invalid van ID format" });
  }

  // 2. Validate status
  const allowedStatuses = ['Arrived', 'Waiting', 'Traveling', 'Parked'];
  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Allowed: ${allowedStatuses.join(', ')}` });
  }

  try {
    // 3. Find and update van
    const van = await Van.findById(vanId);
    if (!van) return res.status(404).json({ error: "Van not found" });

    van.status = status;
    await van.save();

    res.json({ message: "Van status updated successfully", van });
  } catch (error) {
    console.error("Update van status error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
