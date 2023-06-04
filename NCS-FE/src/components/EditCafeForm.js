import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/EditCafeForm.css';
 

function EditCafeForm() {
  const { cafeId } = useParams();
  const [cafe, setCafe] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafe();
  }, []);

  const fetchCafe = async () => {
    try {
      const response = await fetch(`http://localhost:3003/cafes/${cafeId}`);
      const data = await response.json();
      setCafe(data);
      // Pre-fill the form with the Cafe's information
      setName(data.name);
      setDescription(data.description);
      setLocation(data.location);
    } catch (error) {
      console.error('Failed to fetch Cafe:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new Cafe object with updated form data
    const updatedCafe = {
      id: cafeId,
      name,
      description,
      logo,
      location,
    };

    try {
      // Perform the PUT request to update the Cafe
      const response = await fetch(`http://localhost:3003/cafe`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCafe),
      });

      if (response.ok) {
        console.log('Cafe updated successfully');
        // Redirect to the Cafe page after successful update
        navigate('/');
      } else {
        console.log('Failed to update Cafe');
      }
    } catch (error) {
      console.error('Failed to update Cafe:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Edit Cafe</h1>
  
      {cafe && (
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
  
          <div className="button-container">
          <button type="submit">Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        </form>
      )}
    </div>
  );
  
}

export default EditCafeForm;
