const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  van: { type: mongoose.Schema.Types.ObjectId, ref: 'Van', required: true },
  passengerName: { type: String, required: true },
  seatNumber: { type: Number },
  reservationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reservation', reservationSchema);
