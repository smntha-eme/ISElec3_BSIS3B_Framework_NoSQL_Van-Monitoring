
=======
# UV Express Van Monitoring and Reservation System for Legazpi-Polangui Route 
 Finals Requirement For IS ELEC 3 

## TEAM MEMBERS & ASSIGNED ROLES ##
Project Manager & Tester/QA: Dela Paz, Paula Bianca D.

Backend Lead: Musa, Samantha Mae A.

Frontead Lead: Molleda, Sid Dione M.

Database Admin: Cortes, Aina Shanell C.

## OBJECTIVES ##
● To provide commuters with a platform to view real-time van and seat availability.

● To allow drivers to update the status of their vans, such as arrived, traveling, waiting, or parked.

● To implement a seat reservation feature where passengers can book seats in advance.

● To minimize long queues and reduce waiting time through a more organized reservation process.

● To modernize the recording and monitoring of trips using a digital system to avoid human
errors.

● To create a centralized system that promotes convenience, transparency, and efficient
transportation flow in Polangui.

# Step 1: Initialize Express
- Installed Express.js
- Created app.js
- Added root GET route
- Tested server at http://localhost:3000

# Step 2: Implement MVC Structure
- Created /controllers, /routes, /models, /views folders
- Added homeController.js
- Added homeRoutes.js
- Connected route in app.js
- Tested home route at http://localhost:3000

# Step 3: Van Routes and Controller
- Created vanController.js with:
  - getAllVans
  - getVanById
  - updateVan
- Created vanRoutes.js with GET and PUT endpoints
- Connected vanRoutes in app.js
- Tested APIs with Postman/Thunder Client

# Step 4: Reservation API

- Created reservationController.js with full CRUD functionality:
  - POST /reservations → Create a new reservation with seat validation.
  - GET /reservations → Retrieve all reservations.
  - GET /reservations/:id → Retrieve reservation by ID.
  - DELETE /reservations/:id → Cancel reservation and restore seat count.

- Created reservationRoutes.js and connected it in app.js.
Implemented error handling for:
  - 400 → Bad request (missing fields, invalid ObjectId)
  - 404 → Not found (Van or Reservation not found)
  - 500 → Internal server errors
  - Tested reservation endpoints using Postman/Thunder Client.

  # Step 5: Completed Backend Features

## Van Management Features
- GET /vans → Retrieve all vans
- GET /vans/:id/status → Retrieve the current status of a specific van
- PUT /vans/:id/status → Update the status of a van (Arrived, Waiting, Traveling, Parked)
  - Input validation ensures only allowed statuses are accepted
  - Returns 400 for invalid input, 404 if van not found
- Modular routes structure for clean code organization

## Reservation Features
- POST /reservations → Create a reservation for a specific van
  - Validates required fields (`vanId`, `passengerName`)
  - Checks valid van ID format
  - Checks for van existence and available seats
  - Reduces `availableSeats` after successful reservation
  - Returns proper status codes: 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)
- GET /reservations → Retrieve all reservations with populated van info

## Testing
- All endpoints tested with Thunder Client / Postman
- Proper error handling implemented with descriptive messages
