import axios from 'axios';

// Créer une instance Axios avec l'URL de base de ton API Laravel
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Change cette URL si nécessaire
});

// Ajouter un intercepteur pour ajouter automatiquement le token d'authentification si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Si le token est stocké
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
