const jtw = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  jtw.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) return res.status(403).json({ message: "Invalid token" });


    req.user = data;
    next();
  });
};
