import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Adapter ce chemin à ta config

const AutumnDestinations = () => {
  const [trips, setTrips] = useState([]);

  // Récupérer les voyages d'automne depuis l'API
  useEffect(() => {
    axios.get('/trips') // Remplace '/autumn-trips' par l'endpoint correspondant de ton API
      .then(response => {
        setTrips(response.data.trips); // Assurer que l'API retourne un tableau "trips"
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des voyages d\'automne', error);
      });
  }, []);

  return (
<section className="py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-4 text-black-600">
      Les meilleures destinations d'automne
    </h2>
    <h3 className="text-lg font-small text-center mb-8 text-gray-600">
      Découvrez nos suggestions pour un automne inoubliable
    </h3>

    {/* Grille pour afficher les voyages */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {trips.length > 0 ? (
        trips.slice(0, 5).map((trip, index) => (
          <div key={index} className="rounded-lg shadow-lg overflow-hidden">
            <img 
              src={`http://localhost:8000/${trip.image}`} 
              alt={trip.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{trip.title}</h3>
              <p className="text-gray-500">{trip.description.slice(0, 80)}...</p>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun voyage disponible.</p>
      )}
    </div>
  </div>
</section>

  );
};

export default AutumnDestinations;
