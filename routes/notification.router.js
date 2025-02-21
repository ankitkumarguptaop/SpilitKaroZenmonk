const express = require("express");
const { notificationcontrollers } = require("../controllers");
const router = express.Router();

router.get("/", notificationcontrollers.listNotification);
router.patch("/:notification_id", notificationcontrollers.readNotification);

module.exports = router;
