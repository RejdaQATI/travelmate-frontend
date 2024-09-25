import React from 'react';

const AlaskaSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[550px] flex items-center"
      style={{ backgroundImage: "url('images/alaska-bg.png')" }} 
    >

      <div className="relative z-10 container mx-auto px-4 flex items-center justify-between">
        <div className="w-1/2 hidden md:flex justify-center items-center">
          <img
            src="images/alaska.png" 
            alt="Alaska"
            className="rounded-lg max-w-lg h-auto object-cover" 
          />
        </div>

        {/* Texte à droite */}
        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explorez l'Alaska</h2>
          <p className="text-lg md:text-xl mb-6">
            Découvrez l'immensité sauvage de l'Alaska avec ses paysages à couper le souffle,
            ses montagnes majestueuses, ses glaciers impressionnants et une faune unique.
            Partez à l'aventure dans cette destination extraordinaire et vivez une expérience inoubliable.
          </p>
          <a
            href="/trips/alaska"
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300"
          >
            Découvrez nos voyages en Alaska
          </a>
        </div>
      </div>
    </div>
  );
};

export default AlaskaSection;
