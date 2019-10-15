const express = require("express");
const router = express.Router();
const hmo = require("../Controllers/HMOController");

router.put("/edit/:id", hmo.edit);
router.post("/child", hmo.addChild);
router.get("/view/all", hmo.viewAll);
router.get("/view/:id", hmo.view);
router.post("/register", hmo.register);

module.exports = router;
