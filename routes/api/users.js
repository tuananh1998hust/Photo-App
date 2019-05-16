const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Keys
const { secretOrKey } = require("../../config/keys");
// Validate Register Input
const validateRegisterInput = require("../../validation/register");
// User Model
const User = require("../../models/users");

// @route    POST api/users/register
// @desc     Create New User
// @access   Public
router.post("/register", validateRegisterInput, (req, res) => {
  const { name, email, password } = req.body;

  // Check User
  User.findOne({ email }).then(user => {
    if (user) {
      // Match User
      return res.status(400).json({ msg: ["User is alredy exist"] });
    }

    // Not User Create New User
    // Set Default Avatar
    const avatar = "/default-ava.jpg";

    const newUser = new User({
      name,
      email,
      avatar,
      password
    });

    // Hash Password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        newUser.save().then(user => {
          jwt.sign(
            { user: user.id },
            secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
