// Trips.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TripList from '../components/TripList';
import SearchBar from '../components/SearchBar'; 
import HeroImage from '../components/HeroImage'; 

const Trips = () => {
  const [searchFilters, setSearchFilters] = useState(null); // Stocker les filtres de recherche

  // Fonction pour mettre à jour les filtres de recherche
  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <div>
      <Header />
      <main>
        <HeroImage />
        {/* Passer la fonction handleSearch à SearchBar */}
        <SearchBar onSearch={handleSearch} />
        {/* Passer les filtres de recherche à TripList */}
        <TripList searchFilters={searchFilters} />
      </main>
      <Footer />
    </div>
  );
};

export default Trips;
