require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

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

// ================= SERVE FRONTEND IN PRODUCTION =================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
} else {
  // ================= TEST ROUTE (DEV ONLY) =================
  app.get("/", (req, res) => {
    res.send("🚐 Welcome to UV Express Van Monitoring!");
  });
}

// ================= SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
