import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const ManageTrips = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
          setTrips(trips.filter(trip => trip.id !== id));
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du voyage', error);
        });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/trips/update/${id}`); // Redirige vers la page de mise à jour
  };

  const handleAddTrip = () => {
    navigate('/trips/add'); // Redirige vers la page d'ajout d'un nouveau voyage
  };

  return (
    <div>
      {/* Ajouter un bouton en haut à droite */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gérer les voyages</h2>
        <button
          onClick={handleAddTrip}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Ajouter un voyage
        </button>
      </div>

      {/* Tableau des voyages */}
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
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(trip.id)}
                >
                  Supprimer
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg"
                  onClick={() => handleUpdate(trip.id)} // Redirection vers la page de mise à jour
                >
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
