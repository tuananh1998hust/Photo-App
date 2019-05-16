const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
const auth = require("../../middleware/auth");
// keys
const { secretOrKey } = require("../../config/keys");
// User Model
const User = require("../../models/users");
// Validate Login Input
const validateLoginInput = require("../../validation/login");

// @route    POST api/auth
// @desc     Login
// @access   Public
router.post("/", validateLoginInput, (req, res) => {
  const { email, password } = req.body;

  // Check User
  User.findOne({ email }).then(user => {
    if (!user) {
      // Not User
      return res.status(404).json({ msg: ["User Not Found"] });
    }

    // Compare Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        // Not Match
        return res.status(400).json({ msg: ["Password Incorrect"] });
      }

      // Match & Sign JWT
      jwt.sign(
        { user: user.id },
        secretOrKey,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id
            }
          });
        }
      );
    });
  });
});

// @route    GET api/auth
// @desc     Get Current User
// @access   Public
router.get("/", auth, (req, res) => {
  User.findById(req.user)
    .select("-password")
    .then(user => {
      res.json(user);
    });
});

module.exports = router;
