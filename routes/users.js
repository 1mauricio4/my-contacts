const express = require("express");
const router = express.Router();

const {
  userValidationRules,
  validate
} = require("../validators/userValidator");

const User = require("../models/User");

// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post("/", userValidationRules(), validate, (req, res) => {
  res.json(req.body);
});

module.exports = router;
