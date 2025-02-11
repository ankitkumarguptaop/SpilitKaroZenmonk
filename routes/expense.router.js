const express = require("express");
const { expenseControllers } = require("../controllers");
const router = express.Router();

router.get("/:group_id", expenseControllers.listExpenseSummary);
router.post("/:creator_id", expenseControllers.createExpense);
router.delete("/:id", expenseControllers.deleteExpense);
router.patch("/:id", expenseControllers.updateExpense);

module.exports = router;
