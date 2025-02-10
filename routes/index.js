const express = require("express");
const router = express.Router();
const {jwtTokenValidation} =require("../middlewares/auth.middleware")
router.use("/auth", require("./user-auth.route"));
router.use("/users" , jwtTokenValidation , require("./user.route"));

module.exports = router;
