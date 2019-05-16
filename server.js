const express = require("express");
const mongoose = require("mongoose");

// DB Config
const { mongoURI } = require("./config/keys");

const app = express();

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected..."))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
