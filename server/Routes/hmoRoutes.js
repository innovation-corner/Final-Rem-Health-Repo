const express = require("express");
const router = express.Router();
const hmo = require("../Controllers/HMOController");

router.post("/add/", hmo.register);
router.put("/edit/:id", hmo.edit);
router.get("/view/:id", hmo.addChild);
router.get("/view/all", hmo.viewAll);

module.exports = router;
