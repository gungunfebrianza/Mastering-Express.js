const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET API/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET API/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(errors));
  }
);

// @route   POST API/profile
// @desc    Create User Profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const ProfileField = {};
    ProfileField.user = req.user.id;
    if (req.body.handle) ProfileField.user = req.body.handle;
    if (req.body.company) ProfileField.user = req.body.company;
    if (req.body.website) ProfileField.user = req.body.website;
    if (req.body.location) ProfileField.user = req.body.location;
    if (req.body.bio) ProfileField.user = req.body.bio;
    if (req.body.status) ProfileField.user = req.body.status;
    if (req.body.githubusername) ProfileField.user = req.body.githubusername;
    if (typeof req.body.skills !== "undefined") {
      ProfileField.skills = req.body.skills.split(",");
    }
    ProfileField.social = {};
    if (req.body.youtube) ProfileField.user = req.body.youtube;
    if (req.body.twitter) ProfileField.user = req.body.twitter;
    if (req.body.facebook) ProfileField.user = req.body.facebook;
    if (req.body.linkedin) ProfileField.user = req.body.linkedin;
    if (req.body.instagram) ProfileField.user = req.body.instagram;
  }
);

module.exports = router;
