import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const CityList = ({ onCitySelect }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    // Appel à l'API pour récupérer la liste des villes
    axios.get('/cities')
      .then(response => {
        const cityList = response.data.cities;
        setCities(cityList);

        // Définir Los Angeles par défaut
        const defaultCity = cityList.find(city => city.name === 'Los Angeles');
        if (defaultCity) {
          setSelectedCity(defaultCity);
          onCitySelect(defaultCity); // Notifier le parent de la sélection par défaut
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des villes', error);
      });
  }, [onCitySelect]);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    onCitySelect(city);
  };

  return (
    <div className="text-center mb-6 mt-10 px-4">
      {/* Nouveau H1 et H2 */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Choisissez votre prochaine destination
      </h1>
      <h2 className="text-md sm:text-lg text-gray-600 mb-6">
        Trouvez le voyage qui vous correspond et explorez de nouveaux horizons
      </h2>

      {/* Liste des boutons pour les villes avec scroll horizontal */}
      <div className="flex overflow-x-auto space-x-2 justify-center sm:space-x-6 my-8"> {/* Ajout du scroll horizontal */}
        {cities.map(city => (
          <button
            key={city.id}
            onClick={() => handleCityClick(city)}
            className={`bg-cream border border-green-500 text-black-500 p-2 sm:p-3 px-4 sm:px-6 text-xs sm:text-base rounded-full shadow hover:bg-green-100 transition duration-300 ${selectedCity && selectedCity.id === city.id ? 'bg-green-100' : ''}`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityList;
