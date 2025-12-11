require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- import cors
const app = express();

// Models
const Van = require('./models/Van');
const Reservation = require('./models/Reservation');

app.use(express.json());

// Enable CORS
app.use(cors()); // <-- add this line BEFORE your routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use modular routes
const vanRoutes = require('./routes/vanRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
app.use('/vans', vanRoutes);
app.use('/reservations', reservationRoutes);

// Example test route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
