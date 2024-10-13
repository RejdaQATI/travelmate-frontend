import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar'; 
import HeroImage from '../components/HeroImage'; 
import PopularTrips from '../components/PopularTrips';  
import TripsSlider from '../components/TripsSlider'; 
import MaldivesSection from '../components/MaldivesSection'; 
import AlaskaSection from '../components/AlaskaSection';
import AutumnDestinations from '../components/AutumnDestinations'; 
import CityList from '../components/CityList'; 
import CityDetails from '../components/CityDetails'; 

const Home = () => {
  const [searchFilters, setSearchFilters] = useState(null);

  return (
    <div>
      <Header />
      <main>
        <HeroImage />
        <SearchBar onSearch={setSearchFilters} />
        <PopularTrips searchFilters={searchFilters} />
        <MaldivesSection />
        <TripsSlider />
        <AlaskaSection />
        <CityList />
        <CityDetails />
        <AutumnDestinations />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
