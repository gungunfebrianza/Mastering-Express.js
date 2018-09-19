const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User Model
const user = require("../../models/User");

// @route   GET api/users/test
// @desc    Test Users Route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register Users
// @access  Public
router.post("/register", (req, res) => {
  //check email first
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email is Already Exsist!" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(usoor => {
    if (!usoor) {
      return res.status(404).json({ email: "User Not Found" });
    }

    //check password
    bcrypt.compare(password, usoor.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "Password Incorect" });
      }
    });
  });
});

module.exports = router;
