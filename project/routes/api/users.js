const express = require("express");
const router = express.Router();

// Load User Model
const user = require("../../models/User");

// @route   GET api/users/test
// @desc    Test Users Route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "User Works" }));

// @route   GET api/users/register
// @desc    Register Users
// @access  Public
router.post("/register", (req, res) => {
  //check email first
  User.findOne({email: req.body.email})
});

module.exports = router;
