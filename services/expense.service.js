const { NotFound, BadRequest } = require("../libs/error");
const Expense = require("../models/expense.model").Expense;
const ExpenseParticipants =
  require("../models/expense-participants.model").ExpenseParticipant;
const Groups = require("../models/group.model").Group;

exports.createExpense = async (payload) => {
  const { amount, description, category, group_id } = payload.body;
  const { creator_id } = payload.params;
  if (!amount || !creator_id || !description || !category || !group_id) {
    throw new BadRequest(" Expense data not given!");
  }
  const createdExpense = new Expense({
    created_by: creator_id,
    description: description,
    amount: amount,
    category: category,
    group_id: group_id,
  });

  return await createdExpense.save();
};

exports.deleteExpense = async (payload) => {
  const { id } = payload.params;
  if (!id) {
    throw new BadRequest(" Expense id not given!");
  }
  const deletedExpense = await Expense.findOneAndDelete({ _id: id });
  await ExpenseParticipants.deleteMany({ expense_id: id });
  if (!deletedExpense) {
    throw new NotFound("Expense not found to delete");
  } else {
    return deletedExpense;
  }
};

exports.updateExpense = async (payload) => {
  const { body, params } = payload;
  const { id } = params;
  const { data } = body;
  if (!id) {
    throw new BadRequest(" Expense id not given!");
  }
  const updatedExpense = await Expense.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  if (!updatedExpense) {
    throw new NotFound("Expense not found to update");
  } else {
    return updatedExpense;
  }
};

exports.listExpenseSummary = async (payload) => {
  const { group_id } = payload.params;
  if (!group_id) {
    throw new BadRequest(" Group id not given!");
  }

  const allExpencesParticipantsOfGroup = await Expense.find({
    group_id: group_id,
  });

  if (!allExpencesParticipantsOfGroup) {
    throw new NotFound("Expense Summary cannot be gernated ");
  } else {
    return allExpencesParticipantsOfGroup;
  }
};
