// controllers/reservationController.js

// Sample data (later we’ll use MongoDB)
let reservations = [];
let nextId = 1;

// GET all reservations
exports.getAllReservations = (req, res) => {
  res.json(reservations);
};

// GET reservation by ID
exports.getReservationById = (req, res) => {
  const id = parseInt(req.params.id);
  const reservation = reservations.find(r => r.id === id);
  if (reservation) {
    res.json(reservation);
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
};

// CREATE a new reservation
exports.createReservation = (req, res) => {
  const { passengerName, vanId, seatNumber } = req.body;

  if (!passengerName || !vanId || seatNumber === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newReservation = {
    id: nextId++,
    passengerName,
    vanId,
    seatNumber,
    status: 'Reserved',
  };

  reservations.push(newReservation);
  res.status(201).json({ message: 'Reservation created', reservation: newReservation });
};

// UPDATE reservation (e.g., cancel)
exports.updateReservation = (req, res) => {
  const id = parseInt(req.params.id);
  const reservation = reservations.find(r => r.id === id);

  if (!reservation) {
    return res.status(404).json({ message: 'Reservation not found' });
  }

  const { status } = req.body;
  if (status) reservation.status = status;

  res.json({ message: 'Reservation updated', reservation });
};
