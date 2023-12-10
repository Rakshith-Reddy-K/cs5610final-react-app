import React, { useEffect, useState } from "react";
import "./index.css";
import { useAuth } from "../Home/AuthContext";
import { BsTrash3Fill } from "react-icons/bs";
import { getAllUsers, deleteUser } from "../ProductDetails/Comments/client";
const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const handleDelete = (userId) => {
    try {
      deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      console.log(err);
    }
  };

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
    <div className="col-md-10 m-5">
      <h1>Admin Page</h1>
      {users && users.length > 0 && user.role === 3 && (
        <div>
          <h2>Buyers</h2>
          <table className="table table-bordered two-column-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Remove</th>
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
                    <td>
                      <button className="btn btn-danger me-2">
                        <BsTrash3Fill onClick={() => handleDelete(user.id)} />
                      </button>
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
                <th>Remove</th>
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
                    <td>
                      <button className="btn btn-danger me-2">
                        <BsTrash3Fill onClick={() => handleDelete(user.id)} />
                      </button>
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
