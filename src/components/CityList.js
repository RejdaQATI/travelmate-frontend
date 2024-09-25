import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const CityList = ({ onCitySelect }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer la liste des villes
    axios.get('/cities')
      .then(response => {
        setCities(response.data.cities);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des villes', error);
      });
  }, []);

  return (
    <div className="text-center mb-6 mt-16">
      <h1 className="text-4xl font-bold">Explorez les destinations préférées</h1>
      <h2 className="text-lg text-gray-600 mt-2">Découvrez nos voyages les plus populaires et trouvez votre prochaine aventure.</h2>

      <div className="flex justify-center space-x-6 my-8">
        {cities.map(city => (
          <button
            key={city.id}
            onClick={() => onCitySelect(city)}
            className="bg-white border border-green-500 text-black-500 p-3 px-6 rounded-full shadow hover:bg-green-100 transition duration-300" // Bouton avec background blanc et border vert
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityList;

