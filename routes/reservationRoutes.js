const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Van = require('../models/van');

// POST /reservations → create reservation and reduce available seats
router.post('/', async (req, res) => {
  const { vanId, passengerName } = req.body;

  // 1. REQUIRED FIELDS CHECK
  if (!vanId || vanId.trim() === "") {
    return res.status(400).json({ error: "vanId is required" });
  }

  if (!passengerName || passengerName.trim() === "") {
    return res.status(400).json({ error: "passengerName is required" });
  }

  // 2. VALID OBJECT ID CHECK
  if (!mongoose.Types.ObjectId.isValid(vanId)) {
    return res.status(400).json({ error: "Invalid van ID format" });
  }

  try {
    // 3. FIND VAN IN DB
    const van = await Van.findById(vanId);
    if (!van) {
      return res.status(404).json({ error: "Van not found" });
    }

    // 4. CHECK AVAILABLE SEATS
    if (van.availableSeats <= 0) {
      return res.status(400).json({ error: "No available seats" });
    }

    // 5. CREATE NEW RESERVATION
    const reservation = new Reservation({
      van: vanId,
      passengerName,
      seatNumber: van.totalSeats - van.availableSeats + 1,
    });

    await reservation.save();

    // 6. UPDATE VAN SEATS
    van.availableSeats -= 1;
    await van.save();

    return res.status(201).json({
      message: "Reservation successful",
      reservation,
    });

  } catch (error) {
    console.error("Reservation error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
});

module.exports = router;
