const validator = require("validator");

module.exports = (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push("Please Fill All The Fields");
    return res.status(404).json({ msg: errors });
  }

  if (
    validator.isEmpty(name.trim("")) ||
    validator.isEmpty(email.trim("")) ||
    validator.isEmpty(password.trim("")) ||
    validator.isEmpty(password2.trim(""))
  ) {
    errors.push("Please Fill All The Fields");
  }

  if (!validator.isEmail(email)) {
    errors.push("Email Is Invalid");
  }

  if (!validator.isLength(name, { min: 2 })) {
    errors.push("Name Is Must At Least 2 Characters");
  }

  if (!validator.isLength(password, { min: 6, max: 32 })) {
    errors.push("Password Is Must Between 6 To 32 Characters");
  }

  if (!validator.equals(password, password2)) {
    errors.push("Confirm Password Is Must Matched Password");
  }

  if (errors.length) {
    return res.status(400).json({ msg: errors });
  }

  next();
};
