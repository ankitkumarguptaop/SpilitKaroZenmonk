const { expenseServices } = require("../services");

exports.createExpense = async (req, res) => {
  try {
    const expense = await expenseServices.createExpense({
      body: req.body,
      params: req.params,
      user: req.user,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.log("Failed to create Expense", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await expenseServices.deleteExpense({
      params: req.params,
    });
    res
      .status(200)
      .json({ message: "successfuly deleted group", expense: deletedExpense });
  } catch (error) {
    console.log("Failed to delete expense", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await expenseServices.updateExpense({
      body: req.body,
      params: req.params,
    });

    res.status(200).json({
      message: "successfuly expense Updated",
      expense: updatedExpense,
    });
  } catch (error) {
    console.log("Failed to update expense", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.listExpenseSummary = async (req, res) => {
  try {
    const expenseSummary = await expenseServices.listExpenseSummary({
      params: req.params,
    });
    res.status(200).json(expenseSummary);
  } catch (error) {
    console.log("Failed to list expense Summary", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
