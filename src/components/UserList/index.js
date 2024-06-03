// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Import the CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const instance = axios.create({
          baseURL: 'http://localhost:5000/'
        });
        const headers = {
          "Content-Type": "application/json"
        };
        const res = await instance.get('/api/users', { headers });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="user-list-item">
            <strong>Name:</strong> {user.name}<br />
            <strong>Date of Birth:</strong> {user.dob}<br />
            <strong>Contact Number:</strong> {user.contactNumber}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>User Description:</strong> {user.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
