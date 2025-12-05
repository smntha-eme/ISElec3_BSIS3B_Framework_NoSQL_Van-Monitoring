const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const vanRoutes = require('./routes/vanRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Use routes
app.use('/', homeRoutes);
app.use('/', vanRoutes);
app.use('/', reservationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
