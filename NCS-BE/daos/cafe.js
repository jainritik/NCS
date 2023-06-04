const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../database/database');
const dbName = require('../config/constants');
const uuid = require('../util/utils');

const databaseName = dbName;

function getCafes(location) {
    return new Promise((resolve, reject) => {
        let query, values;
        if (!location) {
            query = `
        SELECT
          c.id, c.name, c.description, c.logo, c.location, COALESCE(COUNT(ec.employee_id),0) AS employee
        FROM 
          ${databaseName}.cafes c 
        LEFT JOIN 
          ${databaseName}.employee_cafes ec 
        ON c.id = ec.cafe_id
        GROUP BY c.id
        ORDER BY employee DESC
      `;
        } else {
            query = `
        SELECT
          c.id, c.name, c.description, c.logo, c.location, COALESCE(COUNT(ec.employee_id), 0) AS employee
        FROM 
          ${databaseName}.cafes c 
        LEFT JOIN 
          ${databaseName}.employee_cafes ec 
        ON c.id = ec.cafe_id
        WHERE location = ?
        GROUP BY c.id
        ORDER BY employee DESC
      `;
            values = [location];
        }
        connection.query(query, values, (err, rows) => {
            if (err) {
                console.log(err);
                reject("Failed to retrieve cafes.");
            } else {
                console.log("successfully got cafes and result is:", rows);
                resolve(rows);
            }
        });
    });
}

function addCafe(cafeData) {
    return new Promise((resolve, reject) => {
        if (!cafeData.name || !cafeData.description || !cafeData.location) {
            reject("Incomplete or incorrect cafe data.");
        } else {
            const uniqueId = uuid.generateUUID();
            let query, values;
            query = `INSERT INTO ${databaseName}.cafes (id, name, description, logo, location) VALUES (?, ?, ?, ?, ?)`;
            values = [uniqueId, cafeData.name, cafeData.description, cafeData.logo, cafeData.location]
            // Insert the cafe into the database
            connection.query(query, values,
                (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject("Failed to add cafe.");
                    } else {
                        resolve(rows);
                    }
                }
            );
        }
    });
}

function updateCafeDetails(cafeData) {
    return new Promise((resolve, reject) => {
        const { id, name, description, logo, location } = cafeData;
        const query = `UPDATE ${databaseName}.cafes SET name = '${name}', description = '${description}', logo = '${logo}', location = '${location}' WHERE id = '${id}'`;

        connection.query(query, (err, results) => {
            if (err) {
                console.log(err);
                reject("Failed to update cafe details.");
            } else {
                resolve(results);
            }
        });
    });
}

// function deleteCafe(id) {
//     return new Promise((resolve, reject) => {
//         // Delete employees associated with the cafe
//         const deleteEmployeesQuery = `DELETE FROM ${databaseName}.employees WHERE id IN (SELECT employee_id FROM ${databaseName}.employee_cafes WHERE cafe_id = ?)`;
//         connection.query(deleteEmployeesQuery, [id], (err, employeesResult) => {
//             if (err) {
//                 console.error(err);
//                 reject("Failed to delete employees.");
//             } else {
//                 // Delete the cafe
//                 console.log("*************** id is", id)
//                 const deleteCafeQuery = `DELETE FROM ${databaseName}.cafes WHERE id = ?`;
//                 connection.query(deleteCafeQuery, [id], (err, cafeResult) => {
//                     if (err) {
//                         console.error(err);
//                         reject("Failed to delete cafe.");
//                     } else {
//                         console.error("************ deleted", cafeResult);

//                         resolve(cafeResult);
//                     }
//                 });
//             }
//         });
//     });
// }

function deleteCafe(id) {
    return new Promise((resolve, reject) => {
      // Delete the records from employee_cafes table referencing the cafe
      const deleteMappingsQuery = `DELETE FROM ${databaseName}.employee_cafes WHERE cafe_id = ?`;
      connection.query(deleteMappingsQuery, [id], (err, mappingsResult) => {
        if (err) {
          console.error(err);
          reject("Failed to delete mappings.");
        } else {
          // Delete employees associated with the cafe
          const deleteEmployeesQuery = `DELETE FROM ${databaseName}.employees WHERE id IN (SELECT employee_id FROM ${databaseName}.employee_cafes WHERE cafe_id = ?)`;
          connection.query(deleteEmployeesQuery, [id], (err, employeesResult) => {
            if (err) {
              console.error(err);
              reject("Failed to delete employees.");
            } else {
              // Delete the cafe
              const deleteCafeQuery = `DELETE FROM ${databaseName}.cafes WHERE id = ?`;
              connection.query(deleteCafeQuery, [id], (err, cafeResult) => {
                if (err) {
                  console.error(err);
                  reject("Failed to delete cafe.");
                } else {
                  resolve(cafeResult);
                }
              });
            }
          });
        }
      });
    });
  }
  
  

function getCafeData(cafeID) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${databaseName}.cafes WHERE id = ?`;
      const values = [cafeID];
     
      connection.query(query, values, (err, rows) => {
        if (err) {
          console.error(err);
          reject("Failed to retrieve cafes.");
        } else {
          console.log("Successfully retrieved cafes and the result is:", rows);
  
          if (rows.length === 0) {
            reject("Café not found");
          }
  
          resolve(rows[0]);
        }
      });
    });
}  

module.exports = { getCafes, addCafe, updateCafeDetails, deleteCafe, getCafeData };