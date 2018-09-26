const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.email) ? data.email : "";
  data.company = !isEmpty(data.password) ? data.password : "";
  data.from = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "Title Field is required";
  }
  if (validator.isEmpty(data.company)) {
    errors.company = "Company Field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "From Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
