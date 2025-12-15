require("dotenv").config();
const mongoose = require("mongoose");
const Reservation = require("./models/Reservation");

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

async function checkReservations() {
  try {
    const reservations = await Reservation.find().limit(5);
    console.log("Sample reservations:", JSON.stringify(reservations, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

checkReservations();
