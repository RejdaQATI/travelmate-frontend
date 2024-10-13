import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Stocke l'utilisateur en cours de modification
  const [updatedName, setUpdatedName] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');

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

  // Fonction pour commencer la modification d'un utilisateur
  const handleEditUser = (user) => {
    setEditingUser(user); // Définit l'utilisateur en cours de modification
    setUpdatedName(user.name); // Initialise le nom à modifier
    setUpdatedRole(user.role); // Initialise le rôle à modifier
  };

  // Fonction pour soumettre la mise à jour de l'utilisateur
  const handleUpdateUser = () => {
    axios.put(`/users/${editingUser.id}`, {
      name: updatedName,
      role: updatedRole
    })
      .then(response => {
        // Met à jour la liste des utilisateurs localement
        setUsers(users.map(user => (user.id === editingUser.id ? response.data.user : user)));
        setEditingUser(null); // Réinitialise le mode édition
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      });
  };

  // Fonction pour annuler la modification
  const handleCancelEdit = () => {
    setEditingUser(null); // Réinitialise le mode édition
  };

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
              <td className="border px-4 py-2">
                {/* Si l'utilisateur est en mode édition, afficher un champ de texte */}
                {editingUser && editingUser.id === user.id ? (
                  <input 
                    type="text" 
                    value={updatedName} 
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {/* Si l'utilisateur est en mode édition, afficher un champ de sélection pour le rôle */}
                {editingUser && editingUser.id === user.id ? (
                  <select 
                    value={updatedRole} 
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border px-4 py-2">
                {editingUser && editingUser.id === user.id ? (
                  <>
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      onClick={handleUpdateUser}
                    >
                      Enregistrer
                    </button>
                    <button 
                      className="bg-gray-500 text-white px-4 py-2 ml-2 rounded-lg"
                      onClick={handleCancelEdit}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleEditUser(user)}
                    >
                      Modifier
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg">
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
