import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const ManageTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Récupérer tous les voyages via l'API
    axios.get('/trips')
      .then(response => {
        setTrips(response.data.trips);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des voyages:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce voyage ?')) {
      axios.delete(`/trips/${id}`)
        .then(() => {
          // Supprimer le voyage de l'état local après suppression réussie
          setTrips(trips.filter(trip => trip.id !== id));
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du voyage', error);
        });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gérer les voyages</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Prix</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.id}>
              <td className="border px-4 py-2">{trip.title}</td>
              <td className="border px-4 py-2">{trip.description}</td>
              <td className="border px-4 py-2">{trip.price} €</td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(trip.id)}>
                  Supprimer
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg">
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTrips;
