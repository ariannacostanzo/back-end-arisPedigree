const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

//validators
const validator = require("../middlewares/validator.js");
const authValidations = require("../validations/auth.js");

router.post(
  "/register",
  validator(authValidations.registerBody),
  authController.register
);
router.post(
  "/login",
  validator(authValidations.loginBody),
  authController.login
);

module.exports = router;
