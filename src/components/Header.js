import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout'; 

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const url = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      if (url.pathname === "/") {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [url]);

  const isHomePage = url.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? 'bg-white shadow-md py-1 ' // Réduis le padding lorsque l'utilisateur fait défiler
            : 'bg-transparent py-4' // Plus de padding sans scroll
          : 'bg-white shadow-md py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        <Link
          to="/"
          className={`text-2xl font-bold transition-colors duration-300 ${
            isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'
          } relative`}
        >
          {/* Affiche le logo uniquement si isScrolled est true */}
          {isScrolled && (
            <img 
              src="../images/logo2.png" // Remplace par le chemin correct de ton logo
              alt="Logo" 
              className="h-16 w-auto " 
            />
          )}
          {!isScrolled && "TravelMate"} {/* Affiche TravelMate si l'utilisateur n'a pas encore scrollé */}
        </Link>

        {/* Burger menu icon for small screens */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Navigation links for large screens */}
        <nav className="hidden sm:flex space-x-6">
          <Link
            to="/"
            className={`transition duration-300 ${
              isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            Accueil
          </Link>
          <Link
            to="/trips"
            className={`transition duration-300 ${
              isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            Voyages
          </Link>

          {/* Afficher "Mon Profil" uniquement si l'utilisateur est connecté */}
          {isLoggedIn && (
            <Link
              to="/profile"
              className={`transition duration-300 ${
                isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
              } hover:text-blue-500`}
            >
              Mon Profil
            </Link>
          )}

          <Link
            to="/about"
            className={`transition duration-300 ${
              isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            À propos
          </Link>

          {/* Show Connexion or Déconnexion */}
          {isLoggedIn ? (
            <Logout setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Link
              to="/login"
              className={`transition duration-300 ${
                isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
              } hover:text-blue-500`}
            >
              Connexion
            </Link>
          )}
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg sm:hidden">
            <nav className="flex flex-col items-center space-y-4 py-6">
              <Link
                to="/"
                onClick={toggleMenu} // Close the menu on click
                className="text-gray-700 hover:text-blue-500"
              >
                Accueil
              </Link>
              <Link
                to="/trips"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-500"
              >
                Voyages
              </Link>

              {/* Afficher "Mon Profil" uniquement si l'utilisateur est connecté */}
              {isLoggedIn && (
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Mon Profil
                </Link>
              )}

              <Link
                to="/about"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-500"
              >
                À propos
              </Link>

              {/* Show Connexion or Déconnexion */}
              {isLoggedIn ? (
                <Logout setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
