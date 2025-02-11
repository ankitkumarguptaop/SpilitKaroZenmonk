const express = require("express");
const { groupControllers } = require("../controllers");
const router = express.Router();

router.post("/:user_id", groupControllers.createGroup);
router.delete("/:id", groupControllers.deleteGroup);
router.patch("/:id", groupControllers.updateGroup);

module.exports = router;
