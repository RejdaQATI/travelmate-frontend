import React, { useState, useEffect } from 'react';
import api from '../axiosConfig';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      });
  }, []);

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
