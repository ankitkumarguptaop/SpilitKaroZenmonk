const express = require("express");
const { userControllers } = require("../controllers");
const router = express.Router();

router.get("/:id", userControllers.listUser);
router.delete("/:id", userControllers.deleteUser);
router.patch("/:id", userControllers.updateUser);

module.exports = router;
