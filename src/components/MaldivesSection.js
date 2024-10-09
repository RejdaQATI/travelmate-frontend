import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation

const MaldivesSection = () => {
  const [trips, setTrips] = useState([]);

  // Fetch Maldives trips on component mount
  useEffect(() => {
    axios.get('/maldives')
      .then(response => {
        setTrips(response.data.trips);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des voyages Maldives', error);
      });
  }, []);

  return (
    <div className="relative bg-cover bg-center h-[600px] flex items-center" style={{ backgroundImage: "url('images/maldives-bg.png')" }}>
      {/* Overlay for better text readability */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col h-full">
        {/* Main Heading */}
        <div className="flex-grow flex items-center justify-left mt-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">
            EXPLOREZ LES MALDIVES
          </h1>
        </div>

        {/* Line in the middle */}
        <div className="w-full border-t border-gray-300 mt-2 mb-10"></div> 

        {/* Bottom content (text + cards) */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-end">
          {/* Small Text at the Bottom Left, hidden on small screens */}
          <div className="text-white text-sm md:text-lg mb-4 w-1/3 self-start hidden sm:block">
            <p>Une aventure tropicale vous attend. Plages, récifs coralliens et luxe absolu.</p>
            <p>Découvrez les îles les plus paradisiaques, où la nature se marie avec des eaux cristallines.</p>
            
            {/* Discover Button */}
            <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Découvrir
            </button>
          </div>

          {/* Cards at the Bottom Right, centered on small screens */}
          <div className="flex space-x-4 mb-4 justify-center">
            {trips.length > 0 ? (
              trips.map(trip => (
                <Link to={`/trips/${trip.id}`} key={trip.id} className="rounded-lg shadow-lg overflow-hidden w-[120px] sm:w-[150px] md:w-[180px]">
                  {/* Image of the trip */}
                  <img
                    src={`http://localhost:8000/${trip.image}`} // Replace with the correct image path from your API
                    alt={trip.title}
                    className="w-full h-40 sm:h-52 object-cover object-left rounded-lg"
                  />
                  <div className="p-1 text-center">
                    <p className="text-lg font-semibold text-white">{trip.title}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white">Aucun voyage disponible pour les Maldives.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaldivesSection;
