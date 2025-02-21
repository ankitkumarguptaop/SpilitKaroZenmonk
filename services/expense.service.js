const { NotFound, BadRequest } = require("../libs/error");
const GroupMember = require("../models/group-member.model").GroupMember;
const Expense = require("../models/expense.model").Expense;
const ExpenseParticipants =
  require("../models/expense-participants.model").ExpenseParticipant;
const Notification = require("../models/notification.model").Notification;
const Group = require("../models/group.model").Group;

exports.createExpense = async (payload) => {
  const { amount, description, category, group_id } = payload.body;
  const { creator_id } = payload.params;
  const { user } = payload;
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

  if (!createdExpense) {
    throw new NotFound("Expense not created");
  }

  const group = await Group.findOne({ _id: group_id });

  if (!group) {
    throw new BadRequest(" No group present where the notification send");
  }

  const notificationsUsers = await GroupMember.find({
    group_id: group_id,
  });
  const notifications = notificationsUsers
    .map((member) => {
      return {
        message: `Expense Created in group ${group.name} by ${user.name}`,
        reciever: member.member_id,
        sender: user._id,
        is_readed: false,
      };
    })
    .filter((member) => {
      return JSON.stringify(member.sender) !== JSON.stringify(member.reciever);
    });

  const savedExpense = await createdExpense.save();

  await Notification.insertMany(notifications);

  return {
    expense: savedExpense,
    message: `Expense Created in group ${group.name} by ${user.name}`,
  };
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
