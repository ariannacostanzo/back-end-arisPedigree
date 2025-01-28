const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.js");

router.post("/", emailController.sendMail);

module.exports = router;
