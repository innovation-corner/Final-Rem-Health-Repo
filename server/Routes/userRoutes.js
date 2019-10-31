const express = require("express");
const router = express.Router();
const user = require("../Controllers/UserController");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname + "public/uploads/") });

// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// const storage = cloudinaryStorage({
//   cloudinary: cloudinary
// });

// const upload = multer({ storage: storage });

router.get("/view", user.single);
router.put("/edit/:id", user.edit);
router.delete("/delete/:id", user.delete);
router.put("/avatar", upload.single("file"), user.avatar);

module.exports = router;
