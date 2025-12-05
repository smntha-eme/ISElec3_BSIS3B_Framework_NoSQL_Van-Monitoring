// routes/vanRoutes.js
const express = require('express');
const router = express.Router();
const vanController = require('../controllers/vanController');

// GET all vans
router.get('/vans', vanController.getAllVans);

// GET single van by ID
router.get('/vans/:id', vanController.getVanById);

// UPDATE van info
router.put('/vans/:id', vanController.updateVan);

module.exports = router;
