const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const ValidateProfileInput = require("../../validation/profile");

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
      .populate("user", ["name", "avatar", "email"])
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

// @route   GET API/profile/handle/:handle
// @desc    Get Profile By Handle
// @access  Public

// @route   POST API/profile
// @desc    Create or Edit User Profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);
    if (!isValid) {
      // Return Any Error with 400 Status
      return res.status(400).json(errors);
    }
    const ProfileFields = {};
    ProfileFields.user = req.user.id;
    if (req.body.handle) ProfileFields.handle = req.body.handle;
    if (req.body.company) ProfileFields.company = req.body.company;
    if (req.body.website) ProfileFields.website = req.body.website;
    if (req.body.location) ProfileFields.location = req.body.location;
    if (req.body.bio) ProfileFields.bio = req.body.bio;
    if (req.body.status) ProfileFields.status = req.body.status;
    if (req.body.githubusername)
      ProfileFields.githubusername = req.body.githubusername;
    if (typeof req.body.skills !== "undefined") {
      ProfileFields.skills = req.body.skills.split(",");
    }
    ProfileFields.social = {};
    if (req.body.youtube) ProfileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) ProfileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) ProfileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) ProfileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) ProfileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          { $set: ProfileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        // Check if Handle Exist
        Profile.findOne({ handle: ProfileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That Handle is Already Exist";
            res.status(400).json(errors);
          }
          // Save Profile
          new Profile(ProfileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
