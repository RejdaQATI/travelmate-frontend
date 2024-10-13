import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Trips from './pages/Trips';
import Profile from './pages/Profile';
import About from './pages/About'; 
import TripDetail from './components/TripDetail'; 
import Reservation from './pages/Reservations'; 
import AdminDashboard from './components/AdminDashboard'; 
import ProtectedRoute from './components/ProtectedRoute';
import UpdateTrip from './components/UpdateTrip';  // Importation de UpdateTrip
import AddTrip from './components/AddTrip'; // Importation du composant AddTrip

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/trips/:id" element={<TripDetail />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <Reservation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Route pour la mise à jour des voyages */}
        <Route
          path="/trips/update/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <UpdateTrip />
            </ProtectedRoute>
          }
        />

        {/* Nouvelle Route pour ajouter un voyage */}
        <Route
          path="/trips/add"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddTrip />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
