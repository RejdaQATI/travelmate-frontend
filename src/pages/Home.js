import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar'; 
import HeroImage from '../components/HeroImage'; 
import AlaskaSection from '../components/AlaskaSection'; 
import PopularTrips from '../components/PopularTrips';  
import TripsSlider from '../components/TripsSlider'; 
import MaldivesSection from '../components/MaldivesSection'; 
import AutumnDestinations from '../components/AutumnDestinations'; 
import CityList from '../components/CityList'; // Importer la liste des villes
import CityDetails from '../components/CityDetails'; // Importer les détails de la ville

const Home = () => {
  const [searchFilters, setSearchFilters] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // Stocker la ville sélectionnée

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <div>
      <Header />
      <main>
        <HeroImage />
        <SearchBar onSearch={handleSearch} />

        {/* Section des villes avec sélection */}
        <CityList onCitySelect={setSelectedCity} />
        <CityDetails city={selectedCity} />

        {/* Autres sections */}
        <PopularTrips />
        <MaldivesSection />
        <TripsSlider />
        <AlaskaSection />
        <AutumnDestinations />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
