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

function App() {
  const token = localStorage.getItem('token'); 
  const role = localStorage.getItem('role'); 
  
  const isAuthenticated = () => {
    return token !== null; 
  };
  const isAdmin = () => {
    return role === 'admin'; 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/trips/:id" element={<TripDetail />} />

        {isAuthenticated() ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/reservation" element={<Reservation />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Navigate to="/login" />} />
            <Route path="/reservation" element={<Navigate to="/login" />} />
          </>
        )}
        {isAuthenticated() && isAdmin() ? (
          <Route path="/admin" element={<AdminDashboard />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/" />} /> 
        )}
      </Routes>
    </Router>
  );
}

export default App;
