const express = require("express");
const router = express.Router();
const dogsController = require("../controllers/dogs.js");
const authMiddleware = require('../middlewares/auth.js')

router.post("/", authMiddleware, dogsController.store);
router.get("/", dogsController.index);
router.get("/allDogs", dogsController.indexAll);
router.delete("/:id", dogsController.destroy);

module.exports = router;
