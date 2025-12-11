require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Models (still import if needed elsewhere)
const Van = require('./models/van');
const Reservation = require('./models/Reservation');

app.use(express.json());

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
