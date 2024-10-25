const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (payload, expiresIn = "30d") =>
  jwt.sign(payload, process.env.JTW_SECRET_KEY, { expiresIn });
