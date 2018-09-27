const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : ""; //if not empty
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must between 2 to 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name Field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must between 6 to 30 characters";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password Field is required";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
