const mongoose = require("mongoose");
const GroupMembers = require("./group-member.model").GroupMember;
const { Schema } = mongoose;

const groupSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is not given"],
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "created_by not given"],
    },
    avatar: {
      type: String,
      require: [true, "avatar is not given"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

// groupSchema.pre("remove", async function (next) {
//   console.log(this._id)
//   await GroupMembers.deleteMany({ group_id: this._id });
//   next();
// });

exports.Group = mongoose.model("Group", groupSchema);
