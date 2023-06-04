const { addEmployee } = require('../daos/employee');
const util = require('../util/utils');

function addEmployeeController(employeeData) {
  return new Promise((resolve, reject) => {
    const { name, email_address, phone_number, gender, start_date } = employeeData
    // Validate email address
    if (!util.validateEmail(email_address)) {
      return reject({ status: 400, message: "Invalid email address" });
    }

    // Validate phone number
    if (!util.validatePhoneNumber(phone_number)) {
      return reject({ status: 400, message: "Invalid phone number" });
    }

    // Validate gender
    if (!util.validateGender(gender)) {
      return reject({ status: 400, message: "Invalid gender" });
    }

    // Construct employee object
    const employee = {
      name,
      email_address,
      phone_number,
      gender,
      start_date
    };

    // Call the addEmployee function from the database module to add the employee
    addEmployee(employee)
      .then((employeeId) => {
        console.log("********EMployeeID ",employeeId)
        resolve(employeeId);
      })
      .catch((error) => {
        console.log("********",error)
        reject({ status: 500, message: "Failed to add employee" });
      });
  });
}

module.exports = { addEmployeeController };