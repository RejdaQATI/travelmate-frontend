import React from 'react';

const CityDetails = ({ city }) => {
  if (!city) return null; // Si aucune ville n'est sélectionnée, on n'affiche rien

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-10">
      <img
        src={`http://localhost:8000/${city.image}`}
        alt={city.name}
        className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg mb-4"
      />

      {/* Boîte blanche légèrement remontée avec contenu en flex */}
      <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-10/12 md:w-9/12 bg-white p-6 shadow-lg rounded-lg mb-4">
        <div className="flex items-center justify-between">
          {/* Texte à gauche */}
          <div className="text-left w-2/4 ml-4"> {/* Paragraphe moins large */}
            <h2 className="text-4xl font-bold mb-6">{city.name}</h2>
            <p className="text-lg text-gray-700">{city.description}</p>
          </div>

          {/* Bouton carré gris foncé à droite */}
          <div>
            {city.trip ? (
              <a
                href={`/trips/${city.trip.id}`}
                className="inline-block bg-gray-700 text-white px-9 py-3 rounded shadow hover:bg-gray-800 transition duration-300 mr-6"
              >
                Découvrir
              </a>
            ) : (
              <p className="text-red-500">Aucun voyage associé à cette ville.</p>
            )}
          </div>
        </div>
      </div>

      {/* Espace en bas pour décaler le contenu en dessous */}
      <div className="h-20"></div>
    </div>
  );
};

export default CityDetails;
