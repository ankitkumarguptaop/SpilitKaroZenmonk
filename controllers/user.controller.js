const { userServices } = require("../services");

exports.listUser = async (req, res) => {
  try {
    const users = await userServices.listUser({
      query: req.query,
      body: req.body,
      params: req.params,
    });
    res.status(200).json(users);
  } catch (error) {
    console.log("Failed to list users", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userServices.updateUser({
      body: req.body,
      params: req.params,
    });
    res.status(200).json({
      message: "successfuly user updated ",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Failed to update", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userServices.deleteUser({
      params: req.params,
    });
    res
      .status(200)
      .json({ message: "successfuly deleted user", user: deletedUser });
  } catch (error) {
    console.log("Failed to delete user", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
