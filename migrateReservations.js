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

async function migrateReservations() {
  try {
    // Update all reservations that have seatNumber but no quantity
    const result = await Reservation.updateMany(
      { quantity: { $exists: false } },
      { $set: { quantity: 1 } }
    );

    console.log(`✅ Migration complete! Updated ${result.modifiedCount} reservations.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateReservations();
