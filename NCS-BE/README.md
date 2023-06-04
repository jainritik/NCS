# Back-end Code

## Description

This repository contains the back-end code. It is responsible for handling API requests, processing data, and interacting with the MySQL database. The back-end code provides the necessary endpoints for the front-end application to retrieve and manipulate cafe and employee data.

## Technologies Used

The back-end code is built using the following technologies:

- Node.js: A JavaScript runtime environment.
- Express.js: A web application framework for Node.js.
- MySQL: A relational database management system for storing cafe and employee data.

## Installation

To run the back-end code locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/jainritik/NCS.git


2. Navigate to the project directory:(Navigate to https://github.com/jainritik/NCS/tree/main/NCS-BE)

cd NCS-BE

3. Install the dependencies:

npm install

4. Set up the MySQL database:

Install MySQL on your system if you have not already.
Create a new MySQL database.
Update the database configuration in the config/config.js file with your database details.

5. Start the server:

node index.js

The back-end server should now be running at http://localhost:3003.

6. API Endpoints
The back-end code exposes the following API endpoints:

GET /cafes: Retrieves a list of all cafes.

GET /cafes/:id: Retrieves details of a specific cafe.

POST /cafes: Creates a new cafe.

PUT /cafes/:id: Updates an existing cafe.

DELETE /cafes/:id: Deletes a cafe.

GET /employees: Retrieves a list of all employees.

GET /employees/:id: Retrieves details of a specific employee.

POST /employees: Creates a new employee.

PUT /employees/:id: Updates an existing employee.

DELETE /employees/:id: Deletes an employee.


Database
The back-end code uses MySQL as the database to store cafe and employee data.