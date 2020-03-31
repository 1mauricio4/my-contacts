const { check, validationResult } = require("express-validator");

const userRegistrationRules = () => {
  return [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ];
};

const userLoginRules = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  userRegistrationRules,
  userLoginRules,
  validate
};
