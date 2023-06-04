const mysql = require('mysql');
const { developmentDB } = require('../config/config');
const { dbName } = require('../config/constants');

const databaseName = dbName;

// Create a MySQL connection
const connection = mysql.createConnection(developmentDB);

// Connect to the MySQL database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');

  // Create a new database if it doesn't exist
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
  connection.query(createDatabaseQuery, (err, result) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created');
  });

  // Create the employees table
  const createEmployeesTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.employees (
    id VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    start_date DATE NOT NULL,
    PRIMARY KEY (id)
  )`;
  connection.query(createEmployeesTableQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Employees table created');
    }
  });

  // Create the cafes table
  const createCafesTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.cafes (
    id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  )`;
  connection.query(createCafesTableQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Cafes table created');
    }
  });

  // Create the employee_cafes table
  const createEmployeeCafesTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.employee_cafes (
    employee_id VARCHAR(20) NOT NULL,
    cafe_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (employee_id, cafe_id),
    FOREIGN KEY (employee_id) REFERENCES ${databaseName}.employees (id),
    FOREIGN KEY (cafe_id) REFERENCES ${databaseName}.cafes (id)
  )`;
  connection.query(createEmployeeCafesTableQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('employee_cafes table created');
    }
  });
});

module.exports = connection;
