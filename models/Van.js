const mongoose = require("mongoose");

const vanSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true },
  route: {
    type: String,
    default: "Polangui - Legazpi",
  },
  status: {
    type: String,
    enum: ["Waiting", "Traveling", "Arrived", "Parked"],
    default: "Waiting",
  },
  availableSeats: {
    type: Number,
    default: 12,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
});

module.exports = mongoose.model("Van", vanSchema);
