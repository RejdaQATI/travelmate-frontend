import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Q8gy708RD5pW73RGdrLYW1xRJEyl4ykZKMBoh7wmey8C1gbX7h1n15xN84mU8gaScpWQkUQAx4H47zSgPcmgc8000hnpMfXbi'); // Clé publique

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/payment', {
          token: token.id,
          amount: amount,
        });

        if (response.data.status) {
          alert('Paiement réussi');
        } else {
          alert('Échec du paiement');
        }
      } catch (error) {
        console.error('Erreur lors du paiement', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Montant:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Payer
      </button>
    </form>
  );
};

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
