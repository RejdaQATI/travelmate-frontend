import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    api.get('/reservations')
      .then(response => {
        setReservations(response.data.reservations);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des réservations</h1>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            Voyage : {reservation.trip.title}, Participants : {reservation.number_of_participants}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
