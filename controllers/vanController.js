// controllers/vanController.js

// Sample data (later we'll use MongoDB)
let vans = [
  { id: 1, plateNumber: 'ABC-123', status: 'Waiting', seatsAvailable: 12 },
  { id: 2, plateNumber: 'DEF-456', status: 'Traveling', seatsAvailable: 8 },
];

// GET all vans
exports.getAllVans = (req, res) => {
  res.json(vans);
};

// GET single van by ID
exports.getVanById = (req, res) => {
  const vanId = parseInt(req.params.id);
  const van = vans.find(v => v.id === vanId);
  if (van) {
    res.json(van);
  } else {
    res.status(404).json({ message: 'Van not found' });
  }
};

// UPDATE van status and seats
exports.updateVan = (req, res) => {
  const vanId = parseInt(req.params.id);
  const van = vans.find(v => v.id === vanId);
  if (van) {
    const { status, seatsAvailable } = req.body;
    if (status) van.status = status;
    if (seatsAvailable !== undefined) van.seatsAvailable = seatsAvailable;
    res.json({ message: 'Van updated', van });
  } else {
    res.status(404).json({ message: 'Van not found' });
  }
};
