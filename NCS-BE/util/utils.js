const { v4: uuidv4 } = require('uuid');

function generateUUID() {
  return uuidv4();
}

function generateEmployeeId() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let employeeId = 'UI';
    
    // Generate random alphanumeric characters
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumeric.length);
      employeeId += alphanumeric[randomIndex];
    }
    
    return employeeId;
}

function validateEmail(email) {
  // Regular expression to validate email address format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  // Regular expression to validate phone number format (starts with 9 or 8 and has 8 digits)
  const phoneRegex = /^[89]\d{7}$/;
  return phoneRegex.test(phoneNumber);
}

function validateGender(gender) {
  // Check if gender is either "Male" or "Female"
  return gender === "Male" || gender === "Female";
}


  
module.exports = {generateUUID, generateEmployeeId, validateEmail, validatePhoneNumber, validateGender}
