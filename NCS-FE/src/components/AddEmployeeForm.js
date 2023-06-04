import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddEmployeeForm.css';

function AddEmployeeForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [cafe, setCafe] = useState('');
  const [startDate, setStartDate] = useState('');
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await fetch('http://localhost:3003/cafes');
      const data = await response.json();
      setCafes(data);
    } catch (error) {
      console.error('Failed to fetch cafes:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Find the selected cafe object based on the cafe name
  const selectedCafe = cafes.find((cafeObj) => cafeObj.name === cafe);


    try {
      const response = await fetch('http://localhost:3003/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email_address: email,
          phone_number: phone,
          gender,
          cafe_id : selectedCafe.id,
          start_date: startDate,
        }),
      });

      if (response.ok) {
        // Employee added successfully, navigate back to the employees page
        navigate('/employees');
      } else {
        console.error('Failed to add employee:', response.status);
      }
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="form-container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === 'Male'}
            onChange={() => setGender('Male')}
          />{' '}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === 'Female'}
            onChange={() => setGender('Female')}
          />{' '}
          Female
        </div>
        <div>
          <label>Assigned Cafe:</label>
          <select value={cafe} onChange={(e) => setCafe(e.target.value)}>
            <option value="">None</option>
            {cafes.map((cafe) => (
              <option key={cafe.id} value={cafe.name}>
                {cafe.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="button-container">
  <button type="submit">Submit</button>
  <button onClick={handleCancel}>Cancel</button>
</div>
      </form>
    </div>
  );
  
}

export default AddEmployeeForm;