import React from 'react';
import axios from '../axiosConfig'; 
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('No token found, unable to logout.');
      return;
    }

    axios.post('/logout', {})
      .then(() => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Set login state to false
        navigate('/'); // Navigate to homepage after logout
      })
      .catch(error => {
        console.error('Erreur lors de la déconnexion', error);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
    >
      Déconnexion
    </button>
  );
};

export default Logout;
