const express = require("express");
const router = express.Router();
const info = require("../Controllers/InfoController");

router.get("/list", info.list);
router.get("/total", info.getTotalCount);
router.put("/edit/:id", info.editSingle);
router.get("/view/:id", info.listSingle);
router.get("/child/:id", info.getChildByImCode);
router.get("/date", info.getByAge);
router.post("/add", info.create);
router.post("/query", info.complexSearch);

module.exports = router;
