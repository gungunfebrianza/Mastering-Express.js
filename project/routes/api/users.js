const express = require("express");
const gravatar = require("gravatar");
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
      .then(user => {
        if (user) {
          return res.status(400).json({'Email is Already Exsist!'});
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: '200', //Size
            r: 'pg', //Rating
            d: 'mm' //Default
          });
          
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar: avatar,
            password: req.body.password
          })
        }
      })
});

module.exports = router;
