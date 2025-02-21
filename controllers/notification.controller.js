const { notificationServices } = require("../services");

exports.listNotification = async (req, res) => {
  try {
    const notifications = await notificationServices.listNotification({
      user: req.user,
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.log("Failed to list Notifications", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.readNotification = async (req, res) => {
  try {
    const updatedNotification = await notificationServices.readNotification({
      params: req.params,
    });
    res.status(200).json(updatedNotification);
  } catch (error) {
    console.log("Failed to Update Notifications", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
