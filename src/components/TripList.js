// TripList.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Importer axios pour les requêtes API

const TripList = ({ searchFilters }) => {
  const [trips, setTrips] = useState([]); // Stocke tous les voyages
  const [filteredTrips, setFilteredTrips] = useState([]); // Stocke les voyages filtrés

  // Charger les voyages lors du montage du composant
  useEffect(() => {
    axios.get('/trips')
      .then(response => {
        setTrips(response.data.trips); // Charger tous les voyages
        setFilteredTrips(response.data.trips); // Initialiser les voyages filtrés
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des voyages', error);
      });
  }, []);

  // Mettre à jour les voyages filtrés à chaque modification de searchFilters
  useEffect(() => {
    if (searchFilters) {
      const { destination, dates } = searchFilters;

      const filtered = trips.filter(trip => {
        const matchDestination = destination ? trip.destination.toLowerCase().includes(destination.toLowerCase()) : true;
        // Ajoute ici la logique de filtre pour les dates si nécessaire
        return matchDestination;
      });

      setFilteredTrips(filtered); // Mettre à jour la liste des voyages filtrés
    }
  }, [searchFilters, trips]);

  return (
    <div>
      {/* Liste des voyages */}

        <div className="flex flex-wrap m-3 justify-center">
          {filteredTrips.map(trip => (
            <div key={trip.id} className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 m-3 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={`${trip.image}`}
                alt={trip.title}
                className="w-full h-56 object-cover"
              />
              <p className="text-center p-4 text-lg font-semibold">{trip.title}</p>
              <p className="text-center pb-4 text-sm text-gray-500">À partir de {trip.price} €</p>
            </div>
          ))}
        </div>
        {!filteredTrips.length && <p className="text-center text-lg">Aucun voyage disponible pour le moment !</p>}
      </div>

  );
};

export default TripList;
