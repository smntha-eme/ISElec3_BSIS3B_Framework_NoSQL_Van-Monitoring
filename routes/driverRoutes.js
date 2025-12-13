const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");
const Van = require("../models/Van");
const authDriver = require("../middleware/authDriver");
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/upload");


// ================= REGISTER DRIVER =================
router.post("/register", async (req, res) => {
  const {
    name,
    licenseId,
    address,
    age,
    birthday,
    email,
    password,
    profilePic,
    plateNumber,
  } = req.body;

  if (!name || !licenseId || !email || !password || !plateNumber) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = new Driver({
      name,
      licenseId,
      address,
      age,
      birthday,
      email,
      password: hashedPassword,
      profilePic,
    });

    await driver.save();

    const van = new Van({
      plateNumber,
      driver: driver._id,
    });

    await van.save();

    driver.van = van._id;
    await driver.save();

    res.status(201).json({
      message: "Driver and van registered successfully",
      driver,
      van,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= LOGIN DRIVER =================

// Register driver with van
router.post("/register", async (req, res) => {
  const { name, licenseId, address, age, birthday, email, password, profilePic, plateNumber } = req.body;

  if (!name || !licenseId || !email || !password || !plateNumber) {
    return res.status(400).json({ error: "Name, license, email, password, and van plate number are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the driver
    const driver = new Driver({
      name,
      licenseId,
      address,
      age,
      birthday,
      email,
      password: hashedPassword,
      profilePic,
    });
    await driver.save();

    // Create the van and associate with the driver
    const van = new Van({
      plateNumber,
      driver: driver._id,
      status: "Waiting", // initial status
      availableSeats: 12 // default seats, adjust if needed
    });
    await van.save();

    // Link the van to the driver
    driver.van = van._id;
    await driver.save();

    res.status(201).json({ message: "Driver and van registered successfully", driver, van });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= UPDATE VAN STATUS =================
router.put("/:id/van-status", authDriver, async (req, res) => {
  const driverId = req.params.id;
  const { status } = req.body;
  const allowedStatuses = ["Waiting", "Traveling", "Arrived", "Parked"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    // 🔐 SECURITY CHECK
    if (req.driver._id.toString() !== driverId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const driver = await Driver.findById(driverId).populate("van");
    if (!driver || !driver.van) {
      return res.status(404).json({ error: "Driver or van not found" });
    }

    driver.van.status = status;
    await driver.van.save();

    res.json({
      message: "Van status updated successfully",
      van: driver.van,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ================= GET ALL DRIVERS =================
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find()
      .populate("van")
      .select("-password");
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
});

// ================= DELETE DRIVER =================
router.delete("/:id", authDriver, async (req, res) => {
  const driverId = req.params.id;

  try {
    // 🔐 SECURITY CHECK
    if (req.driver._id.toString() !== driverId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Optional: delete associated van
    // if (driver.van) await Van.findByIdAndDelete(driver.van);

    await Driver.findByIdAndDelete(driverId);

    res.json({ message: "Driver account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/drivers");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ================= UPLOAD DRIVER PROFILE =================
router.put(
  "/:id/profile-pic",
  authDriver,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      // 🔐 Security check
      if (req.driver._id.toString() !== req.params.id) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      const driver = await Driver.findById(req.params.id);
      if (!driver) return res.status(404).json({ error: "Driver not found" });

      driver.profilePic = `/uploads/drivers/${req.file.filename}`;
      await driver.save();

      res.json({
        message: "Profile picture updated",
        profilePic: driver.profilePic,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
  storage,
});

// Register driver
router.post("/register", async (req, res) => {
  const { name, licenseId, address, age, birthday, email, password, profilePic, plateNumber } = req.body;

  if (!name || !licenseId || !email || !password || !plateNumber) {
    return res.status(400).json({ error: "Name, license, email, password, and van plate number are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Van
    const van = new Van({
      plateNumber,
      status: "Waiting", // default available
      driver: null // temporary, will assign driver after creation
    });

    await van.save();

    // Create a new Driver and link the van
    const driver = new Driver({
      name,
      licenseId,
      address,
      age,
      birthday,
      email,
      password: hashedPassword,
      profilePic,
      van: van._id, // link van
    });

    await driver.save();

    // Update van with driver ID
    van.driver = driver._id;
    await van.save();

    res.status(201).json({ message: "Driver registered successfully", driver, van });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get the logged-in driver's own info
router.get("/me", authDriver, async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver._id).populate("van").select("-password");
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    res.json(driver);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

});


module.exports = router;
