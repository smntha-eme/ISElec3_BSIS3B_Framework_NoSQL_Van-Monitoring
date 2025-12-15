const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  passengerName: { type: String, required: true },
  van: { type: mongoose.Schema.Types.ObjectId, ref: "Van", required: true }, // ref must match model name
  quantity: { type: Number, required: true, default: 1 },
  reservationDate: { type: Date, default: Date.now },
}, 

{ collection: 'reservations' }); // match DB collection

module.exports = mongoose.model("Reservation", reservationSchema);
