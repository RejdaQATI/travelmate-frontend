import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const [numberOfParticipants, setNumberOfParticipants] = useState(1); // Par défaut, 1 participant
  const [tripPrice, setTripPrice] = useState(0); // Le prix par participant
  const [totalPrice, setTotalPrice] = useState(0); // Prix total
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Récupérer trip_date_id depuis les props ou l'URL via useLocation
  const location = useLocation();
  const { tripDateId } = location.state || {}; // tripDateId est passé depuis TripDetail lors du clic sur le bouton "Réserver maintenant"

  // Récupérer le prix du voyage lors du chargement du composant
  useEffect(() => {
    if (tripDateId) {
      axios.get(`/trips/dates/${tripDateId}`) // Assurez-vous que cette route renvoie les détails de trip_date, y compris le prix
        .then(response => {
          const pricePerPerson = response.data.trip_date.price; // Récupère le prix pour chaque participant
          setTripPrice(pricePerPerson);
          setTotalPrice(pricePerPerson * numberOfParticipants); // Calcule le prix total pour 1 participant au départ
        })
        .catch(err => {
          setError('Erreur lors de la récupération des détails du voyage.');
        });
    }
  }, [tripDateId]);

  // Mettre à jour le prix total lorsque le nombre de participants change
  useEffect(() => {
    setTotalPrice(tripPrice * numberOfParticipants);
  }, [numberOfParticipants, tripPrice]);

  // Soumission du formulaire de réservation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tripDateId) {
      setError('Aucune date de voyage sélectionnée.');
      return;
    }

    axios.post('/reservations', {
      trip_date_id: tripDateId,
      number_of_participants: numberOfParticipants,
    })
      .then(response => {
        setSuccess('Votre réservation a été confirmée avec succès.');
        setError(null);

        // Redirection vers la page d'accueil après confirmation
        setTimeout(() => {
          navigate('/'); // Redirection vers la homepage
        }, 1000); // Délai avant redirection pour laisser le message de succès
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Une erreur est survenue lors de la réservation.');
        setSuccess(null);
      });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Réservez votre aventure</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        {/* Nombre de participants */}
        <div className="mb-6">
          <label htmlFor="participants" className="block text-xl font-semibold mb-3">
            Nombre de participants *
          </label>
          <input
            type="number"
            id="participants"
            min="1"
            value={numberOfParticipants}
            onChange={(e) => setNumberOfParticipants(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Prix total */}
        <div className="mb-6">
          <p className="text-lg font-semibold">Prix par participant : {tripPrice}€</p>
          <p className="text-lg font-bold">Prix total : {totalPrice}€</p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {/* Message de succès */}
        {success && (
          <p className="text-green-500 mb-4">{success}</p>
        )}

        {/* Bouton de soumission */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Confirmer la réservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
