const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Van = require('../models/Van');

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

// GET /reservations → list all reservations with van details
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("van"); // FIXED populate field

    res.status(200).json(reservations);
  } catch (error) {
    console.error("GET reservations error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// GET /reservations/:id → get a specific reservation
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid reservation ID format" });
  }

  try {
    const reservation = await Reservation.findById(id).populate("van");

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json(reservation);

  } catch (error) {
    console.error("GET reservation by ID error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

// DELETE /reservations/:id → cancel reservation + return seat
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate reservation ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid reservation ID format" });
  }

  try {
    // Find reservation
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Find van
    const van = await Van.findById(reservation.van);
    if (van) {
      van.availableSeats += 1; // return seat
      await van.save();
    }

    // Delete reservation
    await reservation.deleteOne();

    return res.status(200).json({
      message: "Reservation cancelled successfully",
    });

  } catch (error) {
    console.error("DELETE reservation error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});





module.exports = router;
