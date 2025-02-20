const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = Schema(
  {
    notification: {
      type: String,
      required: [true, "Name is not given"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "created_by not given"],
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "created_by not given"],
    },
    is_readed: {
      type: Boolean,
      require: false,
    },
  },
  { timestamps: true }
);

exports.Notification = mongoose.model("Notification", notificationSchema);
