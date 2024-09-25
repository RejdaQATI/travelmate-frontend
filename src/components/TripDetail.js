import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useParams } from 'react-router-dom';

const TripDetail = () => {
  const { id } = useParams(); // Récupérer l'ID du voyage depuis l'URL
  const [trip, setTrip] = useState(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      {trip ? (
        <div className="space-y-12">
          {/* Section principale */}
          <section className="text-center">
            <h1 className="text-5xl font-bold mb-6 text-blue-800">{trip.title}</h1>
            <img src={`http://localhost:8000/${trip.image}`} alt={trip.title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />
            <p className="text-xl text-gray-700 mb-6">{trip.description}</p>
          </section>

          {/* Informations sur le voyage */}
          <section className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-blue-700 mb-4">Détails du voyage</h2>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              <li><strong>Durée :</strong> {trip.duration} jours</li>
              <li><strong>Prix :</strong> {trip.price} €</li>
              <li><strong>Type :</strong> {trip.type}</li>
              <li><strong>Inclus :</strong> {trip.included}</li>
            </ul>
          </section>

          {/* Galerie d'images (optionnelle) */}
          {trip.gallery && trip.gallery.length > 0 && (
            <section>
              <h2 className="text-3xl font-semibold text-blue-700 mb-4">Galerie</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trip.gallery.map((image, index) => (
                  <img key={index} src={`http://localhost:8000/${image}`} alt={`Image ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-lg" />
                ))}
              </div>
            </section>
          )}

          {/* Avis (optionnel) */}
          {trip.reviews && trip.reviews.length > 0 && (
            <section className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-blue-700 mb-4">Avis des voyageurs</h2>
              <div className="space-y-4">
                {trip.reviews.map((review, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-lg text-gray-700">"{review.comment}"</p>
                    <p className="text-sm text-gray-500 mt-2">- {review.author}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section réservation */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">Réservez votre aventure</h2>
            <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Réserver maintenant
            </button>
          </section>
        </div>
      ) : (
        <p>Chargement des détails du voyage...</p>
      )}
    </div>
  );
};

export default TripDetail;
