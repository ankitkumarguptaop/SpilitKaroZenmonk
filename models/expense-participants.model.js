const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseParticipantSchema = Schema(
  {
    expense_id: {
      type: Schema.Types.ObjectId,
      ref: "Expense",
      require: [true, " Expense id is not given"],
    },
    pay_amount: {
      type: Number,
      require: [true, " pay amount is not given"],
    },
    payer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: [true, "payer id is not given"],
    },
    payee_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: [true, "payee id is not given"],
    },
    setelment_status: {
      type: Boolean,
      default: false,
      require: [true, "setelment status is not given"],
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      require: [true, "Group id is not given"],
    },
  },
  { timestamps: true },
);

exports.ExpenseParticipant = mongoose.model(
  "ExpenseParticipant",
  expenseParticipantSchema,
);
