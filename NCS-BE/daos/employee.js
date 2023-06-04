const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../database/database');
const dbName = require('../config/constants');
const util = require('../util/utils');
const moment = require('moment');

const databaseName = dbName;

function getEmployees(cafeName) {
  return new Promise((resolve, reject) => {
    let query, values;
    if (!cafeName) {
      query = `
        SELECT
          e.id,
          e.name,
          e.email_address,
          e.phone_number,
          COALESCE(DATEDIFF(CURRENT_DATE(), e.start_date), 0) AS days_worked,
          IFNULL(c.name, '') AS cafe_name
        FROM ${databaseName}.employees e
        LEFT JOIN ${databaseName}.employee_cafes ec ON e.id = ec.employee_id
        LEFT JOIN ${databaseName}.cafes c ON ec.cafe_id = c.id
        ORDER BY days_worked DESC
      `;
    } else {
      query = `
        SELECT
          e.id,
          e.name,
          e.email_address,
          e.phone_number,
          COALESCE(DATEDIFF(CURRENT_DATE(), e.start_date), 0) AS days_worked,
          IFNULL(c.name, '') AS cafe_name
        FROM ${databaseName}.employees e
        LEFT JOIN ${databaseName}.employee_cafes ec ON e.id = ec.employee_id
        LEFT JOIN ${databaseName}.cafes c ON ec.cafe_id = c.id
        WHERE c.name = ?
        ORDER BY days_worked DESC
      `;
      values = [cafeName];
    }
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        reject("Failed to retrieve employees.");
      } else {
        resolve(rows);
      }
    });
  });
}

function addEmployee(employee) {
  return new Promise((resolve, reject) => {
    if (!employee.name || !employee.email_address || !employee.phone_number || !employee.gender || !employee.start_date) {
      reject("Incomplete or incorrect employee data.");
    } else {
      const employeeId = util.generateEmployeeId();
      // Insert the employee into the database
      let query, values;
      query = `INSERT INTO ${databaseName}.employees (id, name, email_address, phone_number, gender, start_date) VALUES (?, ?, ?, ?, ?, ?)`;
      values = [employeeId, employee.name, employee.email_address, employee.phone_number, employee.gender, employee.start_date];
      connection.query( query, values,
        (err, rows) => {
          if (err) {
            console.log(err);
            reject("Failed to add employee.");
          } else {
            console.log("addEmployee fun ********", rows)
            resolve(employeeId);
          }
        }
      );
    }
  });
}

function updateEmployeeDetails(employee) {
  return new Promise((resolve, reject) => {
    const { id, name, email_address, phone_number, gender, start_date } = employee;
    const query = `UPDATE ${databaseName}.employees SET name = '${name}', email_address = '${email_address}', phone_number = '${phone_number}', gender = '${gender}' , start_date = '${start_date}'WHERE id = '${id}'`;
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        reject("Failed to update employee details.");
      } else {
        resolve(results);
      }
    });
  });
}

function deleteEmployee(id) {
  return new Promise((resolve, reject) => {
    // Delete the mappings in the employee_cafes table referencing the employee
    const deleteMappingsQuery = `DELETE FROM ${databaseName}.employee_cafes WHERE employee_id = ?`;
    connection.query(deleteMappingsQuery, [id], (err, mappingsResult) => {
      if (err) {
        console.error(err);
        reject("Failed to delete mappings.");
      } else {
        // Delete the employee
        const deleteEmployeeQuery = `DELETE FROM ${databaseName}.employees WHERE id = ?`;
        connection.query(deleteEmployeeQuery, [id], (err, employeeResult) => {
          if (err) {
            console.error(err);
            reject("Failed to delete employee.");
          } else {
            if (employeeResult.affectedRows === 0) {
              // Employee not found
              resolve("Employee not found.");
            } else {
              resolve(employeeResult);
            }
          }
        });
      }
    });
  });
}


function getEmployeeCafes() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        e.name AS employee_name,
        c.name AS cafe_name,
        e.start_date
      FROM
      ${databaseName}.employees e
        JOIN ${databaseName}.employee_cafes ec ON e.id = ec.employee_id
        JOIN ${databaseName}.cafes c ON ec.cafe_id = c.id
    `;
    connection.query(query, (err, rows) => {
      if (err) {
        console.error(err);
        reject("Failed to retrieve employee cafes.");
      } else {
        resolve(rows);
      }
    });
  });
}


function addEmployeeCafes(employee_id, cafe_id) {
  return new Promise((resolve, reject) => {
    // Check if employee_id exists in employees table
    const employeeQuery = `SELECT id FROM ${databaseName}.employees WHERE id = ?`;
    connection.query(employeeQuery, [employee_id], (err, employeeResult) => {
      if (err) {
        console.error(err);
        reject("Failed to add employee to a cafe");
      } else {
        if (employeeResult.length === 0) {
          reject("Employee does not exist");
          return;
        }

        // Check if employee is already assigned to another cafe
        const existingAssignmentQuery = `SELECT cafe_id FROM ${databaseName}.employee_cafes WHERE employee_id = ?`;
        connection.query(existingAssignmentQuery, [employee_id], (err, existingAssignmentResult) => {
          if (err) {
            console.error(err);
            reject("Failed to add employee to a cafe");
          } else {
            const assignedCafeIds = existingAssignmentResult.map(row => row.cafe_id);
            if (assignedCafeIds.includes(cafe_id)) {
              reject("Employee is already assigned to the cafe");
              return;
            }


        // Check if cafe_id exists in cafes table
        const cafeQuery = `SELECT id FROM ${databaseName}.cafes WHERE id = ?`;
        connection.query(cafeQuery, [cafe_id], (err, cafeResult) => {
          if (err) {
            console.error(err);
            reject("Failed to add employee to a cafe");
          } else {
            if (cafeResult.length === 0) {
              reject("Cafe does not exist");
              return;
            }

            // Insert into employee_cafes table
            const insertQuery = `INSERT INTO ${databaseName}.employee_cafes (employee_id, cafe_id) VALUES (?, ?)`;
            const values = [employee_id, cafe_id];

            connection.query(insertQuery, values, (err, result) => {
              if (err) {
                console.error(err);
                reject("Failed to add employee to a cafe");
              } else {
                resolve(result);
              }
            });
          }
        });
      }
    });
  }
});
});
}

function getEmployeeData(employeeId) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${databaseName}.employees WHERE id = ?`;
    const values = [employeeId];
   
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.error(err);
        reject("Failed to retrieve employee data.");
      } else {
        console.log("Successfully retrieved employee data and the result is:", rows);

        if (rows.length === 0) {
          reject("Employee not found");
        }

        resolve(rows[0]);
      }
    });
  });
}  

module.exports = { getEmployees, addEmployee, updateEmployeeDetails, deleteEmployee, getEmployeeCafes, addEmployeeCafes, getEmployeeData };