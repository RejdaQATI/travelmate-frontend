import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TripList from '../components/TripList';
import HeroImage from '../components/HeroImage';
import { useLocation } from 'react-router-dom'; // Utilisation de useLocation pour lire les filtres

const Trips = () => {
  const tripsHeroImage = 'images/newyork1.png';

  // Récupérer le filtre de l'URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const continent = query.get('continent');  // Récupérer le continent dans l'URL

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
        {/* Passer le continent à TripList */}
        <TripList initialContinent={continent} />
      </main>
      <Footer />
    </div>
  );
};

export default Trips;
