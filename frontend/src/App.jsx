import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Vans from "./pages/Vans";
import ReservationForm from "./pages/ReservationForm";
import ReservationsLists from "./pages/ReservationsLists";
import DriverPanel from "./pages/DriverPanel";
import DriverLogin from "./pages/DriverLogin"; // new
import DriverRegister from "./pages/DriverRegister"; // new

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/reservation-form" element={<ReservationForm />} />
        <Route path="/reservations" element={<ReservationsLists />} />
        <Route path="/driver-panel" element={<DriverPanel />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-register" element={<DriverRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
