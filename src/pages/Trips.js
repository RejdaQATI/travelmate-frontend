import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TripList from '../components/TripList';
import HeroImage from '../components/HeroImage'; 

const Trips = () => {
  const tripsHeroImage = 'images/newyork1.png'; // Met l'URL de l'image que tu veux utiliser

  return (
    <div>
      <Header />
      <main>
        {/* Passer l'image et le texte en tant que props à HeroImage */}
        <HeroImage 
          backgroundImage={tripsHeroImage} 
          title="Découvrez nos voyages autour du monde" 
        />
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold">Trouvez tous nos voyages sur une même page</h1>
          <h2 className="text-lg text-gray-600 mt-4">Choisissez un continent et explorez tous les voyages disponibles.</h2>
        </div>
        {/* Affichage de la liste des voyages */}
        <TripList />
      </main>
      <Footer />
    </div>
  );
};

export default Trips;
