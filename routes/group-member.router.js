const express = require("express");
const { groupMemberControllers } = require("../controllers");
const router = express.Router();

router.get("/:group_id", groupMemberControllers.listGroupMember);
router.post("/:group_id", groupMemberControllers.addMemberToGroup);
router.delete(
  "/:group_id",
  groupMemberControllers.removeMemberFromGroup,
);

module.exports = router;
