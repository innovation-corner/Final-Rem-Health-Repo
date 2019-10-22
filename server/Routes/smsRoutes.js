const express = require("express");
const router = express.Router();
const sms = require("../Controllers/SMSController");

router.post("/new", sms.send);
// router.get("/add", sms.view);
// router.put("/edit/:id", sms.edit);
// router.delete("/view/:id", sms.view);

module.exports = router;
