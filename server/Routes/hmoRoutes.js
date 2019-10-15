const express = require("express");
const router = express.Router();
const hmo = require("../Controllers/HMOController");

router.put("/edit/:id", hmo.edit);
router.post("/view/:id", hmo.addChild);
router.get("/view/all", hmo.viewAll);
router.post("/add", hmo.register);

module.exports = router;
