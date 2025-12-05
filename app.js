const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const vanRoutes = require('./routes/vanRoutes');

// Use routes
app.use('/', homeRoutes);
app.use('/', vanRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
