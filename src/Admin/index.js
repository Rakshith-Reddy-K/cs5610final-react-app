import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllUsers } from '../ProductDetails/Comments/client';
import { useAuth } from '../Home/AuthContext';
const AdminPage = () => {
  const [users, setUsers] = useState(null);
  const {user} = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = getAllUsers().then((users) => setUsers(users));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
    <h1>Admin Page</h1>
    {user && user.role === 3 && 
    <div>
      
      <h2>Buyers</h2>
      <ul>
        {users && users
          .filter((user) => user.role === 1)
          .map((user) => (
            <li key={user.id}>
              <a href={`/profile/${user.id}`}>{user.username}</a>
            </li>
          ))}
      </ul>
      <h2>Sellers</h2>
      <ul>
        {users && users
          .filter((user) => user.role === 2)
          .map((user) => (
            <li key={user.id}>
              <a href={`/profile/${user.id}`}>{user.username}</a>
            </li>
          ))}
      </ul>
    </div>
    }
    </div>
  
  );
};

export default AdminPage;