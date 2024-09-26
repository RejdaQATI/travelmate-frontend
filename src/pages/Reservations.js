import React from 'react';
import Header from '../components/Header';
import ReservationForm from '../components/ReservationForm';

const Reservation = () => {
  return (
    <div>
      <Header />
      <main>
        <ReservationForm />
      </main>
    </div>
  );
};

export default Reservation;
