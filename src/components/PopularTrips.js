import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const PopularTrips = () => {
  const [popularTrips, setPopularTrips] = useState([]);

  useEffect(() => {
    // Récupérer les voyages populaires depuis l'API Laravel
    axios.get('/populartrips')
      .then(response => {
        setPopularTrips(response.data.trips); // Charger les voyages populaires
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des voyages populaires', error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-center space-x-6">
        {popularTrips.map(trip => (
          <div 
            key={trip.id} 
            className="w-[220px] sm:w-[220px] m-4 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`http://localhost:8000/${trip.image}`}
              alt={trip.title}
              className="w-full h-[180px] object-cover"
            />
            <p className="text-center p-4 text-lg font-semibold">{trip.title}</p>
            <p className="text-center pb-4 text-sm text-gray-500">À partir de {trip.price} €</p>
          </div>
        ))}
      </div>
      {!popularTrips.length && <p className="text-center text-lg">Aucun voyage populaire disponible pour le moment !</p>}
    </div>
  );
};

export default PopularTrips;
