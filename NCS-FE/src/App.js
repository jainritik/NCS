import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Assuming you have defined your Redux store in a separate file

import CafesPage from './components/CafesPage';
import EmployeesPage from './components/EmployeesPage';
import EditCafeForm from './components/EditCafeForm';
import AddCafeForm from './components/AddCafeForm';
import EditEmployeeForm from './components/EditEmployeeForm';
import AddEmployeeForm from './components/AddEmployeeForm';


function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
      <Route path="/employees" element={<EmployeesPage/>}/>
      
      <Route path="/" element={<CafesPage/>}/>
      <Route path="/edit-cafe/:cafeId" element={<EditCafeForm />} />
      <Route path="/add-cafe" element={<AddCafeForm />} />
      <Route path="/edit-employee/:employeeId" element={<EditEmployeeForm />} />
      <Route path="/employee/add" element={<AddEmployeeForm />} />


      </Routes>
    </Router>
        </Provider>

  );
}


export default App;
