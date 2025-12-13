const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver");

const authDriver = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    );

    const driver = await Driver.findById(decoded.id).select("-password");

    if (!driver) {
      return res.status(401).json({ error: "Invalid token. Driver not found." });
    }

    req.driver = driver; // attach driver info to request
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authDriver;
