import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/EditEmployeeForm.css'; // Import the CSS file

function EditEmployeeForm() {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [cafe, setCafe] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3003/employees/${employeeId}`);
      const data = await response.json();
      // Populate the form fields with the fetched employee data
      setName(data.name);
      setEmail(data.email_address);
      setPhone(data.phone_number);
      setGender(data.gender);
      setCafe(data.cafe);
      setStartDate(data.start_date); // Set the start_date state variable
    } catch (error) {
      console.error('Failed to fetch employee:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3003/employee`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: employeeId,
          name,
          email_address: email,
          phone_number: phone,
          gender,
          cafe,
          start_date: startDate, // Include start_date in the body
        }),
      });

      if (response.ok) {
        // Employee updated successfully, navigate back to the employees page
        navigate('/employees');
      } else {
        console.error('Failed to update employee:', response.status);
      }
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="form-container">
      <h1>Edit Employee</h1>

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

export default EditEmployeeForm;
