import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CafeForm() {
  const { cafeId } = useParams();
  const [cafe, setCafe] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (cafeId) {
      fetchCafe();
    }
  }, [cafeId]);

  const fetchCafe = async () => {
    try {
      const response = await fetch(`http://localhost:3003/cafes/${cafeId}`);
      const data = await response.json();
      setCafe(data);
      setName(data.name);
      setDescription(data.description);
      setLocation(data.location);
    } catch (error) {
      console.error('Failed to fetch Cafe:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new Cafe object with form data
    const updatedCafe = {
      name,
      description,
      logo,
      location,
    };

    try {
      let response;

      if (cafeId) {
        // Perform the PUT request to update the Cafe
        response = await fetch(`http://localhost:3003/cafes/${cafeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCafe),
        });
      } else {
        // Perform the POST request to create a new Cafe
        response = await fetch('http://localhost:3003/cafes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCafe),
        });
      }

      if (response.ok) {
        console.log('Cafe saved successfully');
        // Redirect to the Cafe page after successful submission
        navigate('/');
      } else {
        console.log('Failed to save Cafe');
      }
    } catch (error) {
      console.error('Failed to save Cafe:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>{cafeId ? 'Edit Cafe' : 'Add Cafe'}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required minLength={6} maxLength={10} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={256}></textarea>
        </div>
        <div>
          <label>Logo:</label>
          <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <button type="submit">{cafeId ? 'Update' : 'Submit'}</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CafeForm;
