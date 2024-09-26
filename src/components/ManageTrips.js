import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const ManageTrips = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripDates, setTripDates] = useState([]);

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

  const handleSelectTrip = (tripId) => {
    // Récupérer les périodes (dates) associées à un voyage
    axios.get(`/trips/${tripId}/dates`)
      .then(response => {
        setTripDates(response.data.trip_dates);
        setSelectedTrip(tripId);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des périodes de voyage:", error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gérer les voyages</h2>
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Destination</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.id}>
              <td className="border px-4 py-2">{trip.id}</td>
              <td className="border px-4 py-2">{trip.title}</td>
              <td className="border px-4 py-2">{trip.destination}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleSelectTrip(trip.id)}
                >
                  Voir les périodes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTrip && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Périodes pour le voyage sélectionné</h3>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Date de début</th>
                <th className="px-4 py-2">Date de fin</th>
                <th className="px-4 py-2">Prix</th>
                <th className="px-4 py-2">Participants max</th>
              </tr>
            </thead>
            <tbody>
              {tripDates.map(date => (
                <tr key={date.id}>
                  <td className="border px-4 py-2">{date.start_date}</td>
                  <td className="border px-4 py-2">{date.end_date}</td>
                  <td className="border px-4 py-2">{date.price}</td>
                  <td className="border px-4 py-2">{date.max_participants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTrips;
