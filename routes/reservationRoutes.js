// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// GET all reservations
router.get('/reservations', reservationController.getAllReservations);

// GET single reservation
router.get('/reservations/:id', reservationController.getReservationById);

// CREATE new reservation
router.post('/reservations', reservationController.createReservation);

// UPDATE reservation
router.put('/reservations/:id', reservationController.updateReservation);

module.exports = router;
