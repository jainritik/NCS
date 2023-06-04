import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CafesPage.css';

function CafesPage() {
  const [cafes, setCafes] = useState([]);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      let url = 'http://localhost:3003/cafes';
      if (location) {
        url += `?location=${encodeURIComponent(location)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setCafes(data);
    } catch (error) {
      console.error('Failed to fetch cafes:', error);
    }
  };

  const handleEdit = (cafeId) => {
    navigate(`/edit-cafe/${cafeId}`);
  };

  const handleAddCafe = () => {
    navigate('/add-cafe');
  };

  const handleDelete = async (cafeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this cafe?');
    if (confirmDelete) {
      try {
        const response = await fetch('http://localhost:3003/cafe', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: cafeId }),
        });

        if (response.ok) {
          console.log('Cafe deleted successfully');
          // Refresh the Cafe list after successful deletion
          fetchCafes();
        } else {
          console.log('Failed to delete Cafe');
        }
      } catch (error) {
        console.error('Failed to delete Cafe:', error);
      }
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFilter = () => {
    fetchCafes();
  };

  const handleViewEmployees = (cafeName) => {
    navigate(`/employees?cafeName=${encodeURIComponent(cafeName)}`);
  };

  return (
    <div>
      <h1>Cafe Page</h1>
  
      <div className="filter-section">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
         
          className="location-input"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <div>
          <button className="filter-cafe-button" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
  
      <table className="cafes-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Employees</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cafes.map((cafe) => (
            <tr key={cafe.id}>
              <td>
                <img src={cafe.logo} alt="Cafe Logo" className="cafe-logo" />
              </td>
              <td>{cafe.name}</td>
              <td>{cafe.description}</td>
              <td>{cafe.employee}</td>
              <td>{cafe.location}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(cafe.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(cafe.id)}>
                  Delete
                </button>
                <button
                  className="view-employees-button"
                  onClick={() => handleViewEmployees(cafe.name)}
                >
                  View Employees
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <button className="add-cafe-button" onClick={handleAddCafe}>
        Add New Cafe
      </button>
    </div>
  );
  
}

export default CafesPage;
