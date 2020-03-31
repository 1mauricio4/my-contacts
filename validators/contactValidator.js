const { check, validationResult } = require("express-validator");

const contactAddRules = () => {
  return [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  contactAddRules,
  validate
};
