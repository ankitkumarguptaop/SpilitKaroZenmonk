const express = require("express");
const { authUserControllers } = require("../controllers");
const { uploadAvatar } = require("../middlewares/image-upload.middleware");
const router = express.Router();

router.post(
  "/signup",
  uploadAvatar().single("avatar"),
  authUserControllers.signUp,
);

router.post("/signin", authUserControllers.signIn);
router.post("/google", authUserControllers.googleAuth);

module.exports = router;
