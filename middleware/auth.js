const jwt = require("jsonwebtoken");

const { secretOrKey } = require("../config/keys");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check Token
  if (!token) {
    return res.status(401).json({ msg: ["No Token, Authorization Denined"] });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, secretOrKey);

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
