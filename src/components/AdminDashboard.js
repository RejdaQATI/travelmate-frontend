import React, { useState } from 'react';
import ManageUsers from './ManageUsers';
import ManageReservations from './ManageReservations';
import ManageTrips from './ManageTrips';  // Import du nouveau composant

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // Onglet actif

  // Fonction pour rendre le contenu correspondant à l'onglet sélectionné
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <ManageUsers />;
      case 'reservations':
        return <ManageReservations />;
      case 'trips':  // Nouvelle option pour gérer les voyages
        return <ManageTrips />;
      default:
        return <ManageUsers />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <ul>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg mb-4 ${
                activeTab === 'users' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Gérer les utilisateurs
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg mb-4 ${
                activeTab === 'reservations' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('reservations')}
            >
              Gérer les réservations
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg mb-4 ${
                activeTab === 'trips' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('trips')}
            >
              Gérer les voyages
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
