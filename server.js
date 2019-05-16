const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// API Routes
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
// DB Config
const { mongoURI } = require("./config/keys");

const app = express();

// Static Folder
app.use(express.static("public"));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB is connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
