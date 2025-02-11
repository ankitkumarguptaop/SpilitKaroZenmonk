const { NotFound, ForBidden, BadRequest } = require("../libs/error");
const ExpenseParticipants =
  require("../models/expense-participants.model").ExpenseParticipant;
const Expense = require("../models/expense.model").Expense;
const Users = require("../models/user.model").User;
const Groups = require("../models/group.model").Group;

exports.addParticipantToExpense = async (payload) => {
  const { expense_id, group_id, pay_amount } = payload.body;
  const { user_id } = payload.params;
  const { currentUser } = payload;
  if (!user_id || !pay_amount || !expense_id || !currentUser || !group_id) {
    throw new BadRequest("Data not given!");
  }
  const user = await Users.findOne({ _id: user_id });
  if (!user) {
    throw new NotFound("User doesnt  exists!");
  }
  const expense = await Expense.findOne({ _id: expense_id });

  if (!expense) {
    throw new NotFound("expense doesnt exists!");
  }
  if (JSON.stringify(currentUser._id) !== JSON.stringify(expense.created_by)) {
    throw new ForBidden("You dont have the access to add user");
  }
  const isParticipantAlreadyPresent = await ExpenseParticipants.findOne({
    $and: [{ expense_id: expense_id }, { user_id: user_id }],
  });
  if (isParticipantAlreadyPresent) {
    throw new ForBidden(" participant already exists in expense!");
  } else {
    const expenceParticipant = new ExpenseParticipants({
      expense_id: expense_id,
      pay_amount: pay_amount,
      payer_id: user_id,
      payee_id: currentUser._id,
      group_id: group_id,
    });
    return await expenceParticipant.save();
  }
};

exports.removeParticipantFromExpense = async (payload) => {
  const { expense_id, user_id } = payload.params;
  const { currentUser } = payload;

  if (!user_id || !expense_id || !currentUser) {
    throw new BadRequest("Data not given!");
  }
  const expense = await Expense.findOne({ _id: expense_id });
  if (!expense) {
    throw new NotFound("Expense not found");
  }

  if (JSON.stringify(currentUser._id) !== JSON.stringify(expense.created_by)) {
    throw new ForBidden("You dont have the access to remove user");
  }

  const removedParticipant = await ExpenseParticipants.findOneAndDelete({
    $and: [{ payer_id: user_id }, { expense_id: expense_id }],
  });
  if (!removedParticipant) {
    throw new NotFound("GroupMember not found to remove");
  } else {
    return removedParticipant;
  }
};

exports.updateSetelmentStatus = async (payload) => {
  const { user_id } = payload.params;
  const { expense_id, setelment_status } = payload.body;
  const expenseParticipant = await ExpenseParticipants.findOneAndUpdate(
    {
      $and: [{ payer_id: user_id }, { expense_id: expense_id }],
    },
    { setelment_status: setelment_status },
    { new: true },
  );
  if (!expenseParticipant) {
    throw new NotFound("expenseParticipant not available for upadte");
  } else {
    return expenseParticipant;
  }
};
