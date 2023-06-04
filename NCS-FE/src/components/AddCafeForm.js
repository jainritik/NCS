import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddCafeForm.css';

function AddCafeForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCafe = {
      name,
      description,
      logo,
      location,
    };

    try {
      const response = await fetch('http://localhost:3003/cafe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCafe),
      });

      if (response.ok) {
        console.log('Cafe added successfully');
        navigate('/');
      } else {
        console.log('Failed to add Cafe');
      }
    } catch (error) {
      console.error('Failed to add Cafe:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Add Cafe</h1>
  
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={6}
            maxLength={10}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={256}
          ></textarea>
        </div>
        <div>
          <label>Logo:</label>
          <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
  
        <button className="delete-button" type="submit">Submit</button>
        <button className="delete-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
  
}

export default AddCafeForm;
