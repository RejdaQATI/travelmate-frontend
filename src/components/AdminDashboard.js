import React, { useState } from 'react';
import ManageUsers from './ManageUsers';
import ManageReservations from './ManageReservations';
import ManageTrips from './ManageTrips';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li
            className={`cursor-pointer mb-4 ${activeSection === 'users' ? 'font-semibold' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            Gérer les utilisateurs
          </li>
          <li
            className={`cursor-pointer mb-4 ${activeSection === 'reservations' ? 'font-semibold' : ''}`}
            onClick={() => setActiveSection('reservations')}
          >
            Gérer les réservations
          </li>
          <li
            className={`cursor-pointer mb-4 ${activeSection === 'trips' ? 'font-semibold' : ''}`}
            onClick={() => setActiveSection('trips')}
          >
            Gérer les voyages
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {activeSection === 'users' && <ManageUsers />}
        {activeSection === 'reservations' && <ManageReservations />}
        {activeSection === 'trips' && <ManageTrips />}
      </div>
    </div>
  );
};

export default AdminDashboard;
