const express = require("express");
const router = express.Router();
const im = require("../Controllers/ImmunizationController");

router.post("/add", im.create);
router.get("/child/:id", im.getChildImmunization);
router.put("/edit/:id", im.editSingle);
router.get("/view/:id", im.listSingle);

module.exports = router;
