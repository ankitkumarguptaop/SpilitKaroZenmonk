const express = require("express");
const { groupMemberControllers } = require("../controllers");
const router = express.Router();

router.get("/:group_id", groupMemberControllers.listGroupMembers);
router.post("/:group_id", groupMemberControllers.addMemberToGroup);
router.delete(
  "/:group_id/:user_id",
  groupMemberControllers.removeMemberFromGroup
);

module.exports = router;
