import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>À propos de Travel Mate</h1>
        <p>
          Travel Mate est une plateforme dédiée à aider les voyageurs à organiser leurs voyages en groupe. 
          Notre mission est de rendre les voyages plus accessibles et plus sociaux en permettant aux 
          voyageurs de se connecter et de découvrir des destinations incroyables ensemble.
        </p>
        <p>
          Que vous voyagiez seul ou avec des amis, Travel Mate vous permet de trouver des compagnons de voyage 
          et de rejoindre des groupes pour partager des expériences inoubliables.
        </p>
        <p>
          <strong>Pourquoi choisir Travel Mate ?</strong>
        </p>
        <ul>
          <li>Voyages organisés en groupe</li>
          <li>Communauté active de voyageurs</li>
          <li>Destinations variées à travers le monde</li>
          <li>Réservations simples et sécurisées</li>
        </ul>
        <p>
          Rejoignez-nous et découvrez le monde avec Travel Mate, votre compagnon de voyage idéal.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
