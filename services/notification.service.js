const { BadRequest, NotFound } = require("../libs/error");

const Notification = require("../models/notification.model").Notification;


exports.listNotification = async (payload) => {
    const { user_id } = payload.params;
    if (!user_id) {
      throw new BadRequest("Data not given");
    }

    const notifications = await Notification.find({ reciever: user_id });
  
    if (!notifications) {
      throw new NotFound("User not found to delete");
    } else {
      return notifications;
    }
  };