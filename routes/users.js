const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const {
  userValidationRules,
  validate
} = require("../validators/userValidator");

const User = require("../models/User");

// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post("/", userValidationRules(), validate, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "user already exists" });

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.json({ msg: "user saved" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
