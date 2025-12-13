const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");
const Van = require("../models/Van");
const authDriver = require("../middleware/authDriver");

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
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const driver = await Driver.findOne({ email }).populate("van");
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    const match = await bcrypt.compare(password, driver.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: driver._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "2h" }
    );

    res.json({ token, driver });
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
});


module.exports = router;
