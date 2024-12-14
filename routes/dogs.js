const express = require("express");
const router = express.Router();
const dogsController = require("../controllers/dogs.js");
const authMiddleware = require('../middlewares/auth.js')
//views
const viewMiddleware = require('../middlewares/incrementViews.js')
//images
const upload = require('../middlewares/upload.js')

//validator
const validator = require("../middlewares/validator.js");
const dogsValidations = require("../validations/dogs.js");
const incrementViews = require("../middlewares/incrementViews.js");

router.post("/", authMiddleware, upload.single("image"), validator(dogsValidations.bodyData), dogsController.store);
router.put("/:id", authMiddleware, upload.single("image"), validator(dogsValidations.bodyData), dogsController.update);
router.get("/", dogsController.index);
router.get("/allDogs", dogsController.indexAll);
router.get("/findSire", dogsController.findSire);
router.get("/findDam", dogsController.findDam);
router.get("/:id", incrementViews, dogsController.show);
router.delete("/:id", dogsController.destroy);

module.exports = router;
