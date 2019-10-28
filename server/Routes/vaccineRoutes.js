const express = require("express");
const router = express.Router();
const vaccine = require("../Controllers/VaccineController");

router.post("/add", vaccine.create);
router.post("/remove/:id", vaccine.delete);
router.get("/get", vaccine.retrieve);

module.exports = router;