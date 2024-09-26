import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Récupérer tous les utilisateurs via l'API
    axios.get('/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gérer les utilisateurs</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Rôle</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Supprimer
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg">
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
