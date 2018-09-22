const validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must between 2 to 30 characters";
  }
  return {
    errors,
    isValid: errors
  };
};
