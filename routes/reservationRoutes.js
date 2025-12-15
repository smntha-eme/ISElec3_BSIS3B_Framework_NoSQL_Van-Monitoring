const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Van = require('../models/Van');

router.post('/', async (req, res) => {
  const { vanId, passengerName, quantity } = req.body;
  
  if (!vanId || !passengerName) {
    return res.status(400).json({ error: "vanId and passengerName are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(vanId)) {
    return res.status(400).json({ error: "Invalid van ID" });
  }

  const reservationQuantity = quantity || 1;

  try {
    const van = await Van.findById(vanId);
    if (!van) return res.status(404).json({ error: "Van not found" });
    if (van.availableSeats < reservationQuantity) {
      return res.status(400).json({ error: `Only ${van.availableSeats} seat(s) available` });
    }

    const reservation = new Reservation({
      van: vanId,
      passengerName,
      quantity: reservationQuantity
    });

    await reservation.save();

    van.availableSeats -= reservationQuantity;
    await van.save();

    res.status(201).json({
      message: "Reservation created",
      reservation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// GET /reservations → list all reservations with van details
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('van'); // populate with Van model
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /reservations/:id → get a specific reservation
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid reservation ID" });

  try {
    const reservation = await Reservation.findById(id).populate('van');
    if (!reservation) return res.status(404).json({ error: "Reservation not found" });
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /reservations/:id → cancel reservation + return seat
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid reservation ID" });

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) return res.status(404).json({ error: "Reservation not found" });

    const van = await Van.findById(reservation.van);
    if (van) {
      van.availableSeats += (reservation.quantity || 1);
      await van.save();
    }

    await reservation.deleteOne();
    res.status(200).json({ message: "Reservation cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
