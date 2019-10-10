const express = require("express");
const router = express.Router();
const hs = require("../Controllers/HospitalController");

router.post("/add", hs.create);
router.put("/edit/:id", hs.edit);
router.get("/view/:id", hs.view);

module.exports = router;
