import React, { useState } from 'react';
import api from '../axiosConfig';

const MakeReservation = ({ tripId }) => {
  const [participants, setParticipants] = useState(1);

  const handleReservation = (e) => {
    e.preventDefault();

    api.post('/reservations', { trip_date_id: tripId, number_of_participants: participants })
      .then(() => {
        alert('Réservation réussie !');
      })
      .catch(error => {
        alert('Erreur lors de la réservation.');
      });
  };

  return (
    <div>
      <form onSubmit={handleReservation}>
        <input 
          type="number" 
          value={participants} 
          onChange={(e) => setParticipants(e.target.value)} 
          min="1" 
        />
        <button type="submit">Réserver</button>
      </form>
    </div>
  );
};

export default MakeReservation;
