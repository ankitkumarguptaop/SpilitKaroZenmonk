const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupMemberSchema = Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: [true, "Name is not given"],
    },
    member_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "created_by not given"],
    },
  },
  { timestamps: true },
);

exports.GroupMember = mongoose.model("GroupMember", groupMemberSchema);
