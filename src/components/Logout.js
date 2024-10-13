import React from 'react';
import axios from '../axiosConfig'; 
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn, isScrolled, isHomePage }) => {
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
      <span
      onClick={handleLogout}
      className={`cursor-pointer font-bold transition duration-300 ${
        isScrolled ? 'text-black' : 'text-white'  // Noir quand scrolled, blanc sinon
      }`}
    >
      Déconnexion
    </span>
    );
    
};

export default Logout;
