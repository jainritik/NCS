import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEmployeeForm from './AddEmployeeForm';
import '../css/EmployeePage.css'; // Import the CSS file

function EmployeePage() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const cafeName = params.get('cafeName');
      let url = 'http://localhost:3003/employees';
      if (cafeName) {
        url += `?cafeName=${encodeURIComponent(cafeName)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleEdit = async (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        const response = await fetch('http://localhost:3003/employee', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: employeeId }),
        });

        if (response.ok) {
          console.log('Employee deleted successfully');
          // Refresh the employee list after successful deletion
          fetchEmployees();
        } else {
          console.log('Failed to delete employee');
        }
      } catch (error) {
        console.error('Failed to delete employee:', error);
      }
    }
  };

  const handleAddEmployee = () => {
    navigate('/employee/add');
  };

  return (
    <div>
      <h1>Employee Page</h1>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Days Worked in Cafe</th>
            <th>Cafe Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email_address}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.days_worked}</td>
              <td>{employee.cafe_name}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(employee.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
}

export default EmployeePage;