import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Trips from './pages/Trips';
import Profile from './pages/Profile';
import AdminDashboard from './pages/Admin'; // Import du dashboard admin
import About from './pages/About'; 
import TripDetail from './components/TripDetail'; 
import Reservation from './pages/Reservations'; 
import ManageUsers from './components/ManageUsers';  // Import du composant de gestion des utilisateurs
import ManageReservations from './components/ManageReservations'; // Import du composant de gestion des réservations
import ManageTrips from './components/ManageTrips'; // Import du composant de gestion des voyages

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Route principale du dashboard admin */}
        <Route path="/about" element={<About />} /> {/* Route pour "À propos" */}
        <Route path="/trips/:id" element={<TripDetail />} />
        <Route path="/reservation" element={<Reservation />} />

        {/* Routes spécifiques pour le dashboard admin */}
        <Route path="/admin/users" element={<ManageUsers />} /> {/* Gestion des utilisateurs */}
        <Route path="/admin/reservations" element={<ManageReservations />} /> {/* Gestion des réservations */}
        <Route path="/admin/trips" element={<ManageTrips />} /> {/* Gestion des voyages */}
      </Routes>
    </Router>
  );
}

export default App;
