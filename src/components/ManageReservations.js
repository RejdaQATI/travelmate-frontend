import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [modifiedReservations, setModifiedReservations] = useState({});
  const [isEditing, setIsEditing] = useState({}); // Pour suivre l'état d'édition de chaque réservation

  useEffect(() => {
    api.get('/reservations')
      .then(response => {
        setReservations(response.data.reservations);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations', error);
      });
  }, []);

  // Gérer les modifications locales de chaque réservation
  const handleChange = (id, field, value) => {
    setModifiedReservations(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Fonction pour sauvegarder les modifications
  const handleSave = (id) => {
    const updatedFields = modifiedReservations[id] || {};

    // Remplir les champs non modifiés avec les valeurs actuelles
    const currentReservation = reservations.find(reservation => reservation.id === id);
    const payload = {
      status: updatedFields.status || currentReservation.status,
      payment_status: updatedFields.payment_status || currentReservation.payment_status,
    };

    api.put(`/reservations/${id}`, payload)
      .then(response => {
        // Mettre à jour la réservation dans l'état après la réponse de l'API
        setReservations(reservations.map(reservation =>
          reservation.id === id ? { ...reservation, ...response.data.reservation } : reservation
        ));

        // Passer en mode "non-édition" après la sauvegarde
        setIsEditing(prev => ({ ...prev, [id]: false }));

        // Effacer les changements locaux une fois sauvegardés
        setModifiedReservations(prev => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la réservation', error);
      });
  };

  // Fonction pour activer/désactiver le mode édition
  const handleEdit = (id) => {
    // Initialiser les champs de modification avec les valeurs actuelles si nécessaire
    setModifiedReservations(prev => ({
      ...prev,
      [id]: {
        status: reservations.find(res => res.id === id).status,
        payment_status: reservations.find(res => res.id === id).payment_status,
      },
    }));

    setIsEditing(prev => ({ ...prev, [id]: true }));
  };

  // Fonction pour supprimer une réservation
  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      api.delete(`/reservations/${id}`)
        .then(() => {
          // Supprimer la réservation de l'état
          setReservations(reservations.filter(reservation => reservation.id !== id));
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de la réservation', error);
        });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Liste des réservations</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Voyage</th>
            <th className="px-4 py-2">Participants</th>
            <th className="px-4 py-2">Statut</th>
            <th className="px-4 py-2">Statut Paiement</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td className="border px-4 py-2">{reservation.id}</td>
              <td className="border px-4 py-2">{reservation.user?.name || 'Utilisateur inconnu'}</td>
              <td className="border px-4 py-2">
                {reservation.trip_date?.trip?.title || 'Voyage inconnu'}
              </td>
              <td className="border px-4 py-2">{reservation.number_of_participants}</td>

              {/* Select pour changer le statut de la réservation */}
              <td className="border px-4 py-2">
                {isEditing[reservation.id] ? (
                  <select
                    value={modifiedReservations[reservation.id]?.status || reservation.status}
                    onChange={(e) => handleChange(reservation.id, 'status', e.target.value)}
                    className="border px-2 py-1"
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                ) : (
                  <span>{reservation.status}</span>
                )}
              </td>

              {/* Select pour changer le statut de paiement */}
              <td className="border px-4 py-2">
                {isEditing[reservation.id] ? (
                  <select
                    value={modifiedReservations[reservation.id]?.payment_status || reservation.payment_status}
                    onChange={(e) => handleChange(reservation.id, 'payment_status', e.target.value)}
                    className="border px-2 py-1"
                  >
                    <option value="pending">En attente</option>
                    <option value="paid">Payé</option>
                    <option value="failed">Échec</option>
                  </select>
                ) : (
                  <span>{reservation.payment_status}</span>
                )}
              </td>

              {/* Bouton Save / Edit et Supprimer */}
              <td className="border px-4 py-2">
                {isEditing[reservation.id] ? (
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleSave(reservation.id)}
                  >
                    Sauvegarder
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                      onClick={() => handleEdit(reservation.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      &#10005; {/* Unicode pour la croix */}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReservations;
