import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Trips from './pages/Trips';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About'; 
import TripDetail from './components/TripDetail'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} /> {/* Route pour "À propos" */}
        <Route path="/trip/:id" element={<TripDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
