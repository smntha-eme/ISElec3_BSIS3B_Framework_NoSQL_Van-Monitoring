require('dotenv').config();
const mongoose = require('mongoose');
const Van = require('./models/Van');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("MongoDB connection error:", err));

const vans = [
  { plateNumber: "UVE-001", route: "Polangui - Legazpi", totalSeats: 12, availableSeats: 12, status: "Waiting", driverName: "Juan Dela Cruz" },
  { plateNumber: "UVE-002", route: "Polangui - Legazpi", totalSeats: 14, availableSeats: 14, status: "Waiting", driverName: "Maria Santos" }
];

Van.insertMany(vans)
  .then(() => {
    console.log("Vans inserted!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
