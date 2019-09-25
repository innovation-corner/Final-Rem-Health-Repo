const express = require("express");
const router = express.Router();
const auth = require("../Controllers/AuthController");

router.post("/register", auth.register);
router.post("/login", auth.login);
// router.post("/view/:id", auth.resetPassword);

module.exports = router;
