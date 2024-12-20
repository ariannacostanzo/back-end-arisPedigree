const express = require("express");
const router = express.Router();
const breedsController = require("../controllers/breeds.js");

router.post("/", breedsController.store);
router.get("/", breedsController.index);
router.get("/:slug", breedsController.show);
router.delete("/:id", breedsController.destroy);

module.exports = router;
