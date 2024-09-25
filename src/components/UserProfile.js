import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';

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

  return (
<div className="min-h-screen bg-gray-100 flex justify-center pt-12">

      <div className="max-w-6xl w-full p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-white p-6 shadow-lg">
            <div className="text-center mb-6">
              <img 
                className="w-24 h-24 rounded-full mx-auto mb-4" 
                src={user.avatar || "https://via.placeholder.com/150"} 
                alt="User Avatar" 
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.dateOfBirth}</p>
            </div>
            <div className="space-y-6">
              <a href="#" className="block text-lg text-gray-800 hover:text-blue-600">Profile Informations</a>
              <a href="#" className="block text-lg text-gray-800 hover:text-blue-600">Booking History</a>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 p-8">
            <div className="bg-white rounded-lg p-8 mb-6">
              <h2 className="text-3xl font-semibold mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Date Of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {/* Nouveau bouton après Personal Information */}
            </div>
              <button
                onClick={handleUpdate}
                className="mb-8 ml-8 w-60 bg-gray-500 text-white py-4 px-4 "
              >
                Update Personal Info
              </button>

            <div className="bg-white rounded-lg p-8">
              <h2 className="text-3xl font-semibold mb-6">Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="New password"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="mt-6 ml-8 w-60 bg-gray-500 text-white py-4 px-4 "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
