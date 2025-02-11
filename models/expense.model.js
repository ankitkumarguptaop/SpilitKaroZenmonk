const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = Schema(
  {
    description: {
      type: String,
      required: [true, "description is not given"],
    },
    amount: {
      type: Number,
      require: [true, " Total amount is not given"],
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      require: [true, "group id is not given"],
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: [true, "expence creator is not given"],
    },
    category: {
      type: String,
      require: [true, "category  is not given"],
    },
  },
  { timestamps: true },
);

exports.Expense = mongoose.model("Expense", expenseSchema);
