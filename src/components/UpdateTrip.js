// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../axiosConfig';

// const UpdateTrip = () => {
//   const { id } = useParams(); // ID du voyage (Trip ID)
//   const navigate = useNavigate();

//   // State pour les infos du Trip
//   const [trip, setTrip] = useState({
//     title: '',
//     description: '',
//     destination: '',
//     duration: '',
//     activities: '',
//     included: '',
//     city_id: '', // Association avec city_id
//   });

//   const [image, setImage] = useState(null); // State pour l'image
//   const [cities, setCities] = useState([]); // State pour les villes disponibles

//   // State pour les infos du TripDate
//   const [tripDate, setTripDate] = useState({
//     price: '',
//     start_date: '',
//     end_date: '',
//     max_participants: '',
//   });

//   // Charger les infos du Trip, des TripDate et des villes au chargement
//   useEffect(() => {
//     // Récupérer les infos du Trip
//     axios.get(`/trips/${id}`)
//       .then(response => {
//         console.log('Données du Trip:', response.data.trip); // Pour debug
//         setTrip(response.data.trip); // Remplit les infos du Trip
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des informations du voyage', error);
//       });

//     // Récupérer les infos de TripDate
//     axios.get(`/trips/${id}/dates`)
//       .then(response => {
//         if (response.data.trip_dates.length > 0) {
//           console.log('Données du TripDate:', response.data.trip_dates[0]); // Pour debug
//           setTripDate(response.data.trip_dates[0]); // Charge les infos de TripDate
//         }
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des informations de date du voyage', error);
//       });

//     // Récupérer les villes disponibles
//     axios.get('/cities')
//       .then(response => {
//         setCities(response.data.cities); // Remplit les villes dans le select
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des villes', error);
//       });

//   }, [id]);

//   // Gérer les changements des inputs pour le Trip
//   const handleTripChange = (e) => {
//     setTrip({ ...trip, [e.target.name]: e.target.value });
//   };

//   // Gérer les changements des inputs pour le TripDate
//   const handleTripDateChange = (e) => {
//     setTripDate({ ...tripDate, [e.target.name]: e.target.value });
//   };

//     const handleImageChange = (e) => {
//       const selectedFile = e.target.files[0];
//       console.log("Selected image:", selectedFile); // Pour vérifier si une image est bien sélectionnée
//       setImage(selectedFile); // Récupérer le fichier sélectionné
//     };
    

//   // Soumettre les modifications
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Utiliser FormData pour gérer le fichier image et les autres données
//     const formData = new FormData();
//     formData.append('title', trip.title);
//     formData.append('description', trip.description);
//     formData.append('destination', trip.destination);
//     formData.append('duration', trip.duration);
//     formData.append('activities', trip.activities);
//     formData.append('included', trip.included);
//     formData.append('city_id', trip.city_id); // Ajouter city_id pour le lien avec la ville
//     formData.append('image', image); // Ajouter l'image uniquement si elle est présente


//     // Log pour vérifier le contenu de FormData
//     console.log([...formData.entries()]);

//     // Mettre à jour les infos du Trip
//     axios.post(`/trips/${id}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Accept': 'application/json', // Nécessaire pour envoyer des fichiers
//       },
//     })
//       .then(() => {
//         // Mettre à jour les infos du TripDate
//         axios.put(`/trips/dates/${tripDate.id}`, tripDate)
//           .then(() => {
//             alert('Voyage mis à jour avec succès');
//             navigate('/admin'); // Retourner vers le dashboard admin
//           })
//           .catch(error => {
//             console.error('Erreur lors de la mise à jour de la période de voyage', error);
//           });
//       })
//       .catch(error => {
//         console.error('Erreur lors de la mise à jour du voyage', error);
//       });
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Modifier le voyage</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Titre</label>
//           <input
//             type="text"
//             name="title"
//             value={trip.title}
//             onChange={handleTripChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={trip.description}
//             onChange={handleTripChange}
//             className="border px-4 py-2 w-full"
//           ></textarea>
//         </div>

//         <div>
//           <label>Destination</label>
//           <input
//             type="text"
//             name="destination"
//             value={trip.destination}
//             onChange={handleTripChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Durée</label>
//           <input
//             type="number"
//             name="duration"
//             value={trip.duration}
//             onChange={handleTripChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Activités</label>
//           <textarea
//             name="activities"
//             value={trip.activities}
//             onChange={handleTripChange}
//             className="border px-4 py-2 w-full"
//           ></textarea>
//         </div>

//         <div>
//           <label>Inclus</label>
//           <textarea
//             name="included"
//             value={trip.included}
//             onChange={handleTripChange}
//             className="border px-4 py-2 w-full"
//           ></textarea>
//         </div>

//         <div>
//           <label>Ville</label>
//           <select
//             name="city_id"
//             value={trip.city_id}
//             onChange={handleTripChange}
//             className="border px-4 py-2 w-full"
//           >
//             <option value="">Sélectionnez une ville</option>
//             {cities.map((city) => (
//               <option key={city.id} value={city.id}>
//                 {city.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Image</label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Prix</label>
//           <input
//             type="number"
//             name="price"
//             value={tripDate.price}
//             onChange={handleTripDateChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Date de début</label>
//           <input
//             type="date"
//             name="start_date"
//             value={tripDate.start_date}
//             onChange={handleTripDateChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Date de fin</label>
//           <input
//             type="date"
//             name="end_date"
//             value={tripDate.end_date}
//             onChange={handleTripDateChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Max participants</label>
//           <input
//             type="number"
//             name="max_participants"
//             value={tripDate.max_participants}
//             onChange={handleTripDateChange}
//             className="border px-4 py-2 w-full"
//           />
//         </div>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
//           Mettre à jour
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateTrip;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const UpdateTrip = () => {
  const { id } = useParams(); // ID du voyage (Trip ID)
  const navigate = useNavigate();

  // State pour les infos du Trip
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
  const [cities, setCities] = useState([]); 


  const [tripDate, setTripDate] = useState({
    price: '',
    start_date: '',
    end_date: '',
    max_participants: '',
  });

  // Charger les infos du Trip et du TripDate au chargement
  useEffect(() => {
    // Récupérer les infos du Trip
    axios.get(`/trips/${id}`)
      .then(response => {
        console.log('Données du Trip:', response.data.trip); // Pour debug
        setTrip(response.data.trip); // Remplit les infos du Trip
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations du voyage', error);
      });
  
    // Récupérer les infos de TripDate
    axios.get(`/trips/${id}/dates`)
      .then(response => {
        if (response.data.trip_dates.length > 0) {
          console.log('Données du TripDate:', response.data.trip_dates[0]); // Pour debug
          setTripDate(response.data.trip_dates[0]); // Charge les infos de TripDate
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations de date du voyage', error);
      });
  
    // Récupérer les villes disponibles
    axios.get('/cities')
      .then(response => {
        setCities(response.data.cities); // Remplit les villes
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des villes', error);
      });
  
  }, [id]);
  
  // Gérer les changements des inputs pour le Trip
  const handleTripChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  // Gérer les changements des inputs pour le TripDate
  const handleTripDateChange = (e) => {
    setTripDate({ ...tripDate, [e.target.name]: e.target.value });
  };

  // Gérer le changement de l'image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Récupérer le fichier sélectionné
  };

  // Soumettre les modifications
  const handleSubmit = (e) => {
    e.preventDefault();

    // Utiliser FormData pour gérer le fichier image et les autres données
    const formData = new FormData();
    formData.append('title', trip.title);
    formData.append('description', trip.description);
    formData.append('destination', trip.destination);
    formData.append('duration', trip.duration);
    formData.append('activities', trip.activities);
    formData.append('included', trip.included);
    formData.append('city_id', trip.city_id); 
    if (image) {
      formData.append('image', image); // Ajouter l'image uniquement si elle est présente
    }

    // Mettre à jour les infos du Trip
    axios.post(`/trips/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Nécessaire pour envoyer des fichiers
      },
    })
      .then(() => {
        // Mettre à jour les infos du TripDate
        axios.put(`/trips/dates/${tripDate.id}`, tripDate)
          .then(() => {
            alert('Voyage mis à jour avec succès');
            navigate('/admin'); // Retourner vers le dashboard admin
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour de la période de voyage', error);
          });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du voyage', error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Modifier le voyage</h2>
      <form onSubmit={handleSubmit}>
        {/* Informations du Trip */}
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={trip.title}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={trip.description}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
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
          />
        </div>

        <div>
          <label>Activités</label>
          <textarea
            name="activities"
            value={trip.activities}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
          ></textarea>
        </div>

        <div>
          <label>Inclus</label>
          <textarea
            name="included"
            value={trip.included}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
          ></textarea>
        </div>

        <div>
          <label>Ville</label>
          <select
            name="city_id"
            value={trip.city_id}
            onChange={handleTripChange}
            className="border px-4 py-2 w-full"
          >
            <option value="">Sélectionnez une ville</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
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

        {/* Informations du TripDate */}
        <div>
          <label>Prix</label>
          <input
            type="number"
            name="price"
            value={tripDate.price}
            onChange={handleTripDateChange}
            className="border px-4 py-2 w-full"
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
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateTrip;
