require('dotenv').config();
const mongoose = require('mongoose');
const Van = require('./models/van');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("MongoDB connection error:", err));

async function addPlateNumbers() {
  try {
    const result = await Van.updateMany(
      { plateNumber: { $exists: false } },
      { $set: { plateNumber: "UNKNOWN" } }
    );

    console.log(`Updated ${result.modifiedCount} vans with placeholder plateNumber.`);
  } catch (err) {
    console.log("Error updating vans:", err);
  } finally {
    mongoose.connection.close();
  }
}

addPlateNumbers();
