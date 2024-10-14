import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const AddTrip = () => {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    title: '',
    description: '',
    destination: '',
    duration: '',
    activities: '',
    included: '',
    city_id: '',
  });

  const [image, setImage] = useState(null); 

  const [tripDate, setTripDate] = useState({
    price: '',
    start_date: '',
    end_date: '',
    max_participants: '',
  });

  const handleTripChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleTripDateChange = (e) => {
    setTripDate({ ...tripDate, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', trip.title);
    formData.append('description', trip.description);
    formData.append('destination', trip.destination);
    formData.append('duration', trip.duration);
    formData.append('activities', trip.activities);
    formData.append('included', trip.included);
    formData.append('city_id', trip.city_id);
    if (image) {
      formData.append('image', image); 
    }


    axios.post('/trips', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
      .then(() => {
        alert('Voyage ajouté avec succès');
        navigate('/admin'); 
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du voyage', error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Ajouter un nouveau voyage</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={trip.title}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={trip.description}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
            required
          ></textarea>
        </div>

        <div>
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={trip.destination}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label>Durée</label>
          <input
            type="number"
            name="duration"
            value={trip.duration}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label>Activités</label>
          <textarea
            name="activities"
            value={trip.activities}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
            required
          ></textarea>
        </div>

        <div>
          <label>Inclus</label>
          <textarea
            name="included"
            value={trip.included}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
            required
          ></textarea>
        </div>

        <div>
          <label>Ville (ID)</label>
          <input
            type="text"
            name="city_id"
            value={trip.city_id}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border px-4 py-2 w-full"
          />
        </div>

        <div>
          <label>Prix</label>
          <input
            type="number"
            name="price"
            value={tripDate.price}
            onChange={handleTripDateChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label>Date de début</label>
          <input
            type="date"
            name="start_date"
            value={tripDate.start_date}
            onChange={handleTripDateChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label>Date de fin</label>
          <input
            type="date"
            name="end_date"
            value={tripDate.end_date}
            onChange={handleTripDateChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label>Max participants</label>
          <input
            type="number"
            name="max_participants"
            value={tripDate.max_participants}
            onChange={handleTripDateChange}
            className="border px-4 py-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Ajouter le voyage
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
