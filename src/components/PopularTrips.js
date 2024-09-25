import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom'; // Importer Link

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
    <div className="text-center mb-6 mt-8">
      <h1 className="text-4xl font-bold">Explorez les destinations préférées</h1>
      <h2 className="text-lg text-gray-600 mt-2">Découvrez nos voyages les plus populaires et trouvez votre prochaine aventure.</h2>

      <div className="container mx-auto py-4">
        <div className="flex flex-wrap justify-center space-x-6">
          {popularTrips.map(trip => (
            <Link key={trip.id} to={`/trips/${trip.id}`} className="w-[220px] sm:w-[220px] m-4 bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image du voyage */}
              <img
                src={`http://localhost:8000/${trip.image}`}
                alt={trip.title}
                className="w-full h-[180px] object-cover"
              />
              {/* Titre et prix */}
              <p className="text-center p-4 text-lg font-semibold">{trip.title}</p>
              <p className="text-center pb-4 text-sm text-gray-500">À partir de {trip.price} €</p>
            </Link>
          ))}
        </div>
        {!popularTrips.length && <p className="text-center text-lg">Aucun voyage populaire disponible pour le moment !</p>}
      </div>
    </div>
  );
};

export default PopularTrips;
