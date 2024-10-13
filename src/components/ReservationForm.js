import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Charger la clé publique Stripe depuis l'environnement
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const ReservationForm = () => {
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
  const [tripPrice, setTripPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();  // Utiliser Stripe pour gérer les paiements
  const elements = useElements();  // Utiliser pour récupérer les éléments de Stripe
  const navigate = useNavigate();

  const location = useLocation();
  const { tripDateId } = location.state || {};  // Récupérer l'ID de la date du voyage

  // Récupérer les détails du voyage et calculer le prix total
  useEffect(() => {
    if (tripDateId) {
      axios.get(`/trips/dates/${tripDateId}`)
        .then(response => {
          const pricePerPerson = response.data.trip_date.price;
          setTripPrice(pricePerPerson);
          setTotalPrice(pricePerPerson * numberOfParticipants);
        })
        .catch(() => {
          setError('Erreur lors de la récupération des détails du voyage.');
        });
    }
  }, [tripDateId]);

  // Recalculer le prix total quand le nombre de participants change
  useEffect(() => {
    setTotalPrice(tripPrice * numberOfParticipants);
  }, [numberOfParticipants, tripPrice]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripDateId) {
      setError('Aucune date de voyage sélectionnée.');
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Créer un payment method Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Envoyer les informations de paiement au backend
      const response = await axios.post('/payment', {
        paymentMethodId: paymentMethod.id,
        amount: totalPrice * 100,  // Convertir en centimes pour Stripe
        trip_date_id: tripDateId,
        number_of_participants: numberOfParticipants,
      });

      if (response.data.success) {
        setSuccess('Votre réservation et paiement ont été confirmés avec succès.');
        setError(null);
        setTimeout(() => navigate('/'), 2000);  // Redirection après succès
      } else {
        setError('Le paiement a échoué.');
      }

    } catch (err) {
      setError('Une erreur est survenue lors du paiement.');
    }

    setLoading(false);
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

        {/* Stripe CardElement */}
        <div className="mb-6">
          <label htmlFor="card" className="block text-xl font-semibold mb-3">
            Informations de paiement
          </label>
          <CardElement className="p-3 border border-gray-300 rounded-lg" />
        </div>

        {/* Message d'erreur */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Message de succès */}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Bouton de soumission */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading || !stripe}
          >
            {loading ? 'Processing...' : 'Confirmer la réservation'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Wrapper du composant pour inclure Stripe
const ReservationComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <ReservationForm />
    </Elements>
  );
};

export default ReservationComponent;
