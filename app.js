require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());

// ================= DATABASE =================
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

// ================= ROUTES =================
app.use("/vans", require("./routes/vanRoutes"));
app.use("/reservations", require("./routes/reservationRoutes"));
app.use("/drivers", require("./routes/driverRoutes"));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚐 Welcome to UV Express Van Monitoring!");
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
