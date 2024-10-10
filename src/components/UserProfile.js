import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import MesReservations from './MesReservations'; 

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });

  const [showBookingHistory, setShowBookingHistory] = useState(false); 

  useEffect(() => {
    api.get('/profile')
      .then(response => {
        setUser(response.data.user);
        setFormData({
          ...response.data.user,
          password: '',
          confirmPassword: ''
        });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du profil utilisateur', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const dataToSend = formData.password ? formData : { ...formData, password: undefined };

    api.put('/profile', dataToSend)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du profil', error);
      });
  };

  const toggleBookingHistory = () => {
    setShowBookingHistory(!showBookingHistory); 
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex justify-center pt-12 relative" 
      style={{
        backgroundImage: "url('../images/1321981.jpeg')", 
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)'  
      }}
    >
      <div className="max-w-6xl w-full p-4">
        <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8 flex flex-col md:flex-row">  
          <div className="w-full md:w-1/4 bg-white bg-opacity-70 p-6 shadow-lg mb-6 md:mb-0"> 
            <div className="text-center mb-6">
              <img 
                className="w-24 h-24 rounded-full mx-auto mb-4" 
                src={user.avatar || "https://via.placeholder.com/150"} 
                alt="Avatar de l'utilisateur" 
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.dateOfBirth}</p>
            </div>
            <div className="space-y-6">
              <a 
                href="#" 
                onClick={() => setShowBookingHistory(false)} // Afficher le profil
                className={`block text-lg text-gray-800 hover:text-gray-600 px-4 py-2 rounded-lg transition-all duration-300 ${!showBookingHistory ? 'bg-gray-200 border-gray-500' : ''}`} // Active state for Profile Informations
              >
                Informations du Profil
              </a>
              <a 
                href="#" 
                onClick={toggleBookingHistory} // Afficher l'historique des réservations
                className={`block text-lg text-gray-800 hover:text-gray-600 px-4 py-2 rounded-lg transition-all duration-300 ${showBookingHistory ? 'bg-gray-200 border-gray-500' : ''}`} // Active state for Booking History
              >
                Réservations
              </a>
            </div>
          </div>
          <div className="w-full md:w-3/4 p-8">
            {showBookingHistory ? (
              <div className="bg-white bg-opacity-80 rounded-lg p-8 mb-6 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6">Historique des Réservations</h2>
                <MesReservations /> 
              </div>
            ) : (
              <>
                <div className="bg-white bg-opacity-80 rounded-lg p-8 mb-6 shadow-lg">
                  <h2 className="text-3xl font-semibold mb-6">Informations Personnelles</h2>
                  <div className="grid grid-cols-1 gap-6"> 
                    <div>
                      <label className="block text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Date de Naissance</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Localisation</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleUpdate}
                  className="mb-8 w-full md:w-60 bg-yellow-500 text-white py-4 px-4 "
                >
                  Mettre à jour
                </button>

                <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg">
                  <h2 className="text-3xl font-semibold mb-6">Sécurité</h2>
                  <div className="grid grid-cols-1 gap-6"> {/* Mise à jour responsive */}
                    <div>
                      <label className="block text-gray-700 mb-1">Adresse Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Mot de Passe</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Nouveau mot de passe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Confirmer Mot de Passe</label>
                      <input
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Confirmez le nouveau mot de passe"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleUpdate}
                  className="mt-6 w-full md:w-60 bg-yellow-500 text-white py-4 px-4"
                >
                  Sauvegarder
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
