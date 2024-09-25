import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#13253F' }} className="text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">À propos de nous</h2>
            <p className="text-gray-400">
              Travel Mate est une agence de voyages dédiée à vous offrir les meilleures expériences de voyage partout dans le monde. Notre équipe est passionnée par les découvertes et les aventures uniques.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Liens rapides</h2>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">À propos</a></li>
              <li><a href="/destinations" className="hover:text-white">Destinations</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/privacy" className="hover:text-white">Politique de confidentialité</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contactez-nous</h2>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@travelmate.com</li>
              <li>Téléphone: +33 1 23 45 67 89</li>
              <li>Adresse: 123 Rue des Voyages, Paris, France</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Suivez-nous</h2>
            <ul className="flex space-x-4 text-gray-400">
              <li><a href="https://facebook.com" className="hover:text-white">Facebook</a></li>
              <li><a href="https://instagram.com" className="hover:text-white">Instagram</a></li>
              <li><a href="https://twitter.com" className="hover:text-white">Twitter</a></li>
              <li><a href="https://linkedin.com" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500">
          <p>&copy; 2024 Travel Mate. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
