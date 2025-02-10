const { groupServices } = require("../services");

exports.createGroup = async (req, res) => {
  try {
    const group = await groupServices.createGroup({
      body: req.body,
      params: req.params,
    });
    res.status(201).json(group);
  } catch (error) {
    console.log("Failed to create group", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const updatedGroup = await groupServices.updateGroup({
      body: req.body,
      params: req.params,
    });
    res.status(200).json({
      message: "successfuly group Updated",
      group: updatedGroup,
    });
  } catch (error) {
    console.log("Failed to update group", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await groupServices.deleteGroup({
      params: req.params,
    });
    res
      .status(200)
      .json({ message: "successfuly deleted group", group: deletedGroup });
  } catch (error) {
    console.log("Failed to delete user", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
