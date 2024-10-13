import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Si l'utilisateur n'a pas de token, le rediriger vers la page de connexion
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si la route est réservée aux administrateurs et que l'utilisateur n'est pas admin, rediriger vers la page d'accueil
    if (adminOnly && role !== 'admin') {
        return <Navigate to="/" />;
    }

    // Si tout va bien, rendre le composant enfant
    return children;
};

export default ProtectedRoute;
