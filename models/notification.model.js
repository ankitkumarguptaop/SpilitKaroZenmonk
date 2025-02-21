const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = Schema(
  {
    message: {
      type: String,
      required: [true, "notification is not given"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "sender not given"],
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "reciever not given"],
    },
    is_readed: {
      type: Boolean,
      require: false,
    },
  },
  { timestamps: true },
);

exports.Notification = mongoose.model("Notification", notificationSchema);
