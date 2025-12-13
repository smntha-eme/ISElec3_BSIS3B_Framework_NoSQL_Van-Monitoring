const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseId: { type: String, required: true },
  address: String,
  age: Number,
  birthday: Date,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  van: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Van",
  },
});

module.exports = mongoose.model("Driver", driverSchema);
