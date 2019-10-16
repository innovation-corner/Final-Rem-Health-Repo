const express = require("express");
const router = express.Router();
const info = require("../Controllers/InfoController");

router.get("/list", info.list);
router.get("/total", info.getTotalCount);
router.put("/edit/:id", info.editSingle);
router.get("/view/:id", info.listSingle);
router.get("/date", info.getByAge);
router.post("/add", info.create);

module.exports = router;
