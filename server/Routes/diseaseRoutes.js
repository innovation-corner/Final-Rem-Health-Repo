const express = require("express");
const router = express.Router();
const disease = require("../Controllers/DiseasesController");

router.post("/new/:id", disease.create);
router.get("/view/all", disease.viewAll);
router.get("/view/:id", disease.viewSingle);
router.get("/:id", disease.viewDisease);

module.exports = router;
