const { BadRequest, NotFound } = require("../libs/error");

const Notification = require("../models/notification.model").Notification;

exports.listNotification = async (payload) => {
  const { user } = payload;
  if (!user || !user._id) {
    throw new BadRequest("Data not given");
  }
  const notifications = await Notification.find({ reciever: user._id }).sort({
    createdAt: -1,
  });

  console.log(user._id);
  if (!notifications) {
    throw new NotFound("User not found to delete");
  } else {
    return notifications;
  }
};

exports.readNotification = async (payload) => {
  const { notification_id } = payload.params;

  if (!notification_id) {
    throw new BadRequest("Data not given");
  }
  const updatedNotification = await Notification.findOneAndUpdate(
    { _id: notification_id },
    { is_readed: true },
    {
      new: true,
    },
  );

  if (!updatedNotification) {
    throw new NotFound("Notification not found to read");
  } else {
    return updatedNotification;
  }
};
