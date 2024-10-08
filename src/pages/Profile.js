import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';

const Profile = () => {
  return (
    <div>
      <Header />
      <main>
        <UserProfile />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
