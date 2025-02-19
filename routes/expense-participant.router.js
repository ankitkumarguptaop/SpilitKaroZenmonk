const express = require("express");
const { expenseParticipantControllers } = require("../controllers");
const router = express.Router();

router.get("/:group_id", expenseParticipantControllers.listExpenseMember);
router.post("/:user_id", expenseParticipantControllers.addParticipantToExpense);
router.patch("/:user_id", expenseParticipantControllers.updateSetelmentStatus);
router.delete(
  "/:expense_id/:user_id",
  expenseParticipantControllers.removeParticipantFromExpense,
);

module.exports = router;
