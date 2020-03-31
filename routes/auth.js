const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const { userLoginRules, validate } = require("../validators/userValidator");

const User = require("../models/User");

// @route   GET /api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", (req, res) => {
  res.json({ msg: "Get logged in user" });
});

// @route   POST /api/auth
// @desc    Auth user and get token
// @access  Public
router.post("/", userLoginRules(), validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
