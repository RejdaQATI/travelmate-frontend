import React from 'react';

const CityDetails = ({ city }) => {
  if (!city) return null; // Si aucune ville n'est sélectionnée, on n'affiche rien

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-4 px-4"> {/* Ajout de padding horizontal pour petits écrans */}
      <img
        src={`http://localhost:8000/${city.image}`}
        alt={city.name}
        className="w-full h-[250px] sm:h-[450px] object-cover mx-auto rounded-lg shadow-lg mb-4"
      />

      {/* Boîte blanche légèrement remontée avec contenu en flex */}
      <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-11/12 sm:w-10/12 md:w-9/12 bg-white p-4 sm:p-6 shadow-lg rounded-lg mb-4"
        style={{ backgroundColor: '#eeebeb' }} // Fond couleur crème
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          {/* Texte à gauche */}
          <div className="text-left w-full sm:w-2/3 mb-4 sm:mb-0"> {/* Largeur ajustée sur petits écrans */}
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">{city.name}</h2> {/* Taille ajustée */}
            <p className="text-sm sm:text-lg text-gray-700">{city.description}</p> {/* Texte plus petit sur petits écrans */}
          </div>

          {/* Bouton carré gris foncé à droite */}
          <div className="w-full sm:w-auto text-center sm:text-left">
            {city.trip ? (
              <a
                href={`/trips/${city.trip.id}`}
                className="inline-block bg-gray-700 text-white px-6 sm:px-9 py-3 rounded shadow hover:bg-gray-800 transition duration-300"
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
