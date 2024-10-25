const express = require("express");
const router = express.Router();
const dogsController = require("../controllers/dogs.js");
const authMiddleware = require('../middlewares/auth.js')

//validator
const validator = require("../middlewares/validator.js");
const dogsValidations = require("../validations/dogs.js");

router.post("/", authMiddleware, validator(dogsValidations.bodyData), dogsController.store);
router.get("/", dogsController.index);
router.get("/allDogs", dogsController.indexAll);
router.get("/findSire", dogsController.findSire);
router.get("/findDam", dogsController.findDam);
router.delete("/:id", dogsController.destroy);

module.exports = router;
 