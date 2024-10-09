import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import TripDatePicker from './TripDatePicker';
import Header from './Header'; // Import du Header

const TripDetail = () => {
  const { id } = useParams(); // Récupérer l'ID du voyage depuis l'URL
  const [trip, setTrip] = useState(null);
  const [selectedTripDate, setSelectedTripDate] = useState(null); // Stocker la date sélectionnée
  const navigate = useNavigate(); // Utilisé pour naviguer vers la page de réservation

  useEffect(() => {
    // Requête pour récupérer les détails du voyage en fonction de l'ID
    axios.get(`/trips/${id}`)
      .then(response => {
        setTrip(response.data.trip);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du voyage', error);
      });
  }, [id]);

  const handleDateSelect = (selectedRange) => {
    if (selectedRange && selectedRange.id && selectedRange.price) {
      setSelectedTripDate(selectedRange); // Mettre à jour la date sélectionnée si elle est valide
    } else {
      setSelectedTripDate(null); // Si la sélection est invalide, la remettre à null
    }
  };

  const handleReservationClick = () => {
    if (!selectedTripDate) {
      alert('Veuillez sélectionner une date pour réserver.');
      return;
    }

    // Rediriger vers le composant Reservation avec trip_date_id
    navigate('/reservation', { state: { tripDateId: selectedTripDate.id } });
  };

  return (
    <>
      {/* Inclusion du Header */}
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row mt-16">
        {trip ? (
          <>
            {/* Contenu principal à gauche */}
            <div className="w-full lg:w-2/3 pr-8">
              <section className="mb-8">
                <h1 className="text-5xl font-bold mb-6 text-black">{trip.title}</h1>
                <img src={`http://localhost:8000/${trip.image}`} alt={trip.title} className="w-full h-96 object-cover rounded-lg mb-8" />
                <p className="text-xl text-gray-700 mb-6">{trip.description}</p>
              </section>

              {/* Informations sur le voyage */}
              <section className="mb-8">
                <h2 className="text-3xl font-semibold text-black mb-4">Détails du voyage</h2>
                <ul className="list-disc list-inside text-gray-600">
                  <li><strong>Durée :</strong> {trip.duration} jours</li>
                  <li><strong>Prix :</strong> {trip.price} €</li>
                  <li><strong>Type :</strong> {trip.pack_type}</li>
                </ul>
              </section>

              {/* Activités */}
              {trip.activities && (
                <section className="mb-8">
                  <h2 className="text-3xl font-semibold text-black mb-4">Activités</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {trip.activities.split(',').map((activity, index) => (
                      <li key={index}>{activity.trim()}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Inclus */}
              {trip.included && (
                <section className="mb-8">
                  <h2 className="text-3xl font-semibold text-black mb-4">Inclus dans le voyage</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {trip.included.split(',').map((include, index) => (
                      <li key={index}>{include.trim()}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Boîte avec le prix, bouton réserver et calendrier à droite */}
            <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg">
              {/* Composant TripDatePicker pour choisir la date */}
              <div className="mt-6">
                <TripDatePicker tripId={trip.id} onDateSelect={handleDateSelect} />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-black">
                  {selectedTripDate 
                    ? `${selectedTripDate.price} €` 
                    : trip.price 
                      ? `${trip.price} €` 
                      : "Sélectionnez une date"}
                </h2>
              </div>

              {/* Bouton réserver */}
              <div className="text-center mt-6">
                <button
                  onClick={handleReservationClick}
                  className="px-8 py-4 bg-gray-600 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Chargement des détails du voyage...</p>
        )}
      </div>
    </>
  );
};

export default TripDetail;
