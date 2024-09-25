import React, { useState } from 'react';
import api from '../axiosConfig';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/register', { name, email, password })
      .then(() => {
        alert('Inscription réussie !');
      })
      .catch(error => {
        alert('Erreur lors de l\'inscription.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nom" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Mot de passe" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;
