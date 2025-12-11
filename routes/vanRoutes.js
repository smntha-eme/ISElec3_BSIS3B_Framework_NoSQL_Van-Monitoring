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

// GET /vans/:id/status → get the current status of a van
router.get('/:id/status', async (req, res) => {
  const vanId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(vanId)) {
    return res.status(400).json({ error: "Invalid van ID format" });
  }

  try {
    const van = await Van.findById(vanId);
    if (!van) {
      return res.status(404).json({ error: "Van not found" });
    }

    res.json({ status: van.status });
  } catch (err) {
    console.error("Get van status error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
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

// PUT /vans/:id → update van info (plateNumber, route, totalSeats)
router.put('/:id', async (req, res) => {
  const vanId = req.params.id;
  const { plateNumber, route, totalSeats } = req.body;

  // 1. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(vanId)) {
    return res.status(400).json({ error: "Invalid van ID format" });
  }

  // 2. Validate required fields
  if (!plateNumber || plateNumber.trim() === "") {
    return res.status(400).json({ error: "plateNumber is required" });
  }
  if (!route || route.trim() === "") {
    return res.status(400).json({ error: "route is required" });
  }
  if (!totalSeats || typeof totalSeats !== "number" || totalSeats < 1) {
    return res.status(400).json({ error: "totalSeats must be a number greater than 0" });
  }

  try {
    // 3. Find van
    const van = await Van.findById(vanId);
    if (!van) return res.status(404).json({ error: "Van not found" });

    // 4. Update van info
    van.plateNumber = plateNumber;
    van.route = route;
    van.totalSeats = totalSeats;

    // Adjust availableSeats if totalSeats decreased below current availableSeats
    if (van.availableSeats > totalSeats) {
      van.availableSeats = totalSeats;
    }

    await van.save();

    res.json({ message: "Van updated successfully", van });
  } catch (error) {
    console.error("Update van info error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
