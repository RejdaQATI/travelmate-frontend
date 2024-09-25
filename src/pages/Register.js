import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Inscription</h1>
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
