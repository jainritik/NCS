const express = require('express');
const router = express.Router();
const cafe = require('../daos/cafe');
const employee = require('../daos/employee');
const controller = require('../controllers/employee')

router.get('/cafes', (req, res) => {
  const location = req.query.location;

  cafe.getCafes(location)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to retrieve cafes.');
    });
});

router.get('/cafes/:cafeId', (req, res) => {
  const cafeId = req.params.cafeId; 

  cafe.getCafeData(cafeId)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to retrieve cafes.');
    });
});

router.get('/employees', (req, res) => {
  const cafeName = req.query.cafeName;

  employee.getEmployees(cafeName)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to retrieve employees.');
    });
});


router.get('/employees/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId; 

  employee.getEmployeeData(employeeId)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to retrieve employee data.');
    });
});


router.post('/cafe', (req, res) => {
  const cafeData = req.body;

  cafe.addCafe(cafeData)
    .then(rows => {
      res.send('Cafe added successfully.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to add cafe.');
    });
});

router.post('/employee', (req, res) => {
  const employeeData = req.body;
  console.log("******employeeData", employeeData)
  controller.addEmployeeController(employeeData)
    .then(employeeId => {

      if (employeeData.cafe_id) {
        // Add the cafe data to the employee_cafes table
        employee.addEmployeeCafes(employeeId, employeeData.cafe_id)
          .then(() => {
            res.send('Employee added successfully.');
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Failed to add cafe data.');
          });
      } else {
        res.send('Employee added successfully.');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to add employee.');
    });
});


router.put('/cafe', (req, res) => {
  const cafeData = req.body;

  cafe.updateCafeDetails(cafeData)
    .then(rows => {
      res.send('Cafe updated successfully.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to update cafe details.');
    });
});

router.put('/employee', (req, res) => {
  const employeeData = req.body;

  employee.updateEmployeeDetails(employeeData)
    .then(rows => {
      res.send('Employee updated successfully.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to update employee details.');
    });
});

router.delete('/cafe', (req, res) => {
  const { id } = req.body;

  cafe.deleteCafe(id)
    .then(rows => {
      res.send('Cafe deleted successfully.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to delete cafe.');
    });
});

router.delete('/employee', (req, res) => {
  const { id } = req.body;

  employee.deleteEmployee(id)
    .then(rows => {
      res.send('Employee deleted successfully.');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to delete employee.');
    });
});

router.get('/employee_cafes', (req, res) => {
  employee.getEmployeeCafes()
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to retrieve employee for cafes.');
    });
});

// to create a relation between employee and cafe
router.post('/employee_cafes', (req, res) => {
  const { employee_id, cafe_id } = req.body;
  employee.addEmployeeCafes(employee_id, cafe_id)
    .then(rows => {
      res.send('Successfully added employee to cafe');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to register emplployee to cafe');
    });
});

module.exports = router;