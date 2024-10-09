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
import CityList from '../components/CityList'; 
import CityDetails from '../components/CityDetails'; 

const Home = () => {
  const [searchFilters, setSearchFilters] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); 

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <div>
      <Header />
      <main>
        <HeroImage />
        <SearchBar onSearch={handleSearch} />
        <PopularTrips />
        <MaldivesSection />
        <TripsSlider />
        <AlaskaSection />
        <CityList onCitySelect={setSelectedCity} />
        <CityDetails city={selectedCity} />
        <AutumnDestinations />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
