const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countries.js")


router.post("/", countryController.store);
router.get("/", countryController.index);
router.get("/:slug", countryController.show);
router.delete("/:id", countryController.destroy);

module.exports = router;