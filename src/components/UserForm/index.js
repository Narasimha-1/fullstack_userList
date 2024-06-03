import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contactNumber: '',
    email: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const instance = axios.create({
        baseURL: 'http://localhost:5000/'
      });
      const headers = {
        "Content-Type": "application/json"
      };
      const res = await instance.post('/api/users', formData, { headers });
      console.log(res.data); // Handle success response
      navigate('/userList'); // Navigate to userList after successful form submission
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className='container'>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className='input'/>
        <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} className='input'/>
        <input type="tel" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className='input'/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className='input'/>
        <textarea name="description" placeholder="User Description" value={formData.description} onChange={handleChange} className='input'/>
        <button type="submit" className='button'>Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
