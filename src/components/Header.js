import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Fonction pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attacher l'événement de scroll
    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'événement lors du démontage
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          TravelMate
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link
            to="/"
            className={`transition duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-500`}
          >
            Accueil
          </Link>
          <Link
            to="/trips"
            className={`transition duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-500`}
          >
            Voyages
          </Link>
          <Link
            to="/profile"
            className={`transition duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-500`}
          >
            Mon Profil
          </Link>
          <Link
            to="/about"
            className={`transition duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-500`}
          >
            À propos
          </Link>
          <Link
            to="/login"
            className={`transition duration-300 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            } hover:text-blue-500`}
          >
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
