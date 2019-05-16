const validator = require("validator");

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email || !password) {
    errors.push("Please Fill All The Fields");
    return res.status(404).json({ msg: errors });
  }

  if (
    validator.isEmpty(email.trim("")) ||
    validator.isEmpty(password.trim(""))
  ) {
    errors.push("Please Fill All The Fields");
  }

  if (!validator.isEmail(email)) {
    errors.push("Email Is Invalid");
  }

  if (!validator.isLength(password, { min: 6, max: 32 })) {
    errors.push("Password Is Must Between 6 To 32 Characters");
  }

  if (errors.length) {
    return res.status(400).json({ msg: errors });
  }

  next();
};
