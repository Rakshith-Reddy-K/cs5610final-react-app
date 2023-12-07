import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./index.css"
import { useAuth } from '../Home/AuthContext';
import { getAllUsers } from '../ProductDetails/Comments/client';
const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

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
    <div className='col-md-10 m-5'>
      <h1>Admin Page</h1>
      {users && users.length > 0 && user.role === 3 && (
        <div>
          <h2>Buyers</h2>
          <table className="table table-bordered two-column-table" >
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.role === 1)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <a href={`/profile/${user.id}`}>{user.username}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h2>Sellers</h2>
          <table className="table table-bordered two-column-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.role === 2)
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <a href={`/profile/${user.id}`}>{user.username}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;