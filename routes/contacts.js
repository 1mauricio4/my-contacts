const express = require("express");
const router = express.Router();

const { contactAddRules, validate } = require("../validators/contactValidator");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route   GET /api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post("/", auth, contactAddRules(), validate, async (req, res) => {
  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      type
    });

    const contact = await newContact.save();
    return res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route   PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/:id", (req, res) => {
  res.json({ msg: "Update contact" });
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete contact" });
});

module.exports = router;
