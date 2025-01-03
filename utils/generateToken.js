const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (payload, expiresIn = "365d") =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
 