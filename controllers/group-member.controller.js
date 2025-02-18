const { groupMemberServices } = require("../services");

exports.addMemberToGroup = async (req, res) => {
  try {
    const addedMember = await groupMemberServices.addMemberToGroup({
      body: req.body,
      params: req.params,
      currentUser: req.user,
    });
    res.status(201).json(addedMember);
  } catch (error) {
    console.log("Failed to add Member", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.removeMemberFromGroup = async (req, res) => {
  try {
    const removedMember = await groupMemberServices.removeMemberFromGroup({
      params: req.params,
      body:req.body,
      currentUser: req.user,
    });
    res.status(200).json(removedMember);
  } catch (error) {
    console.log("Failed to remove Member", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.listGroupMember = async (req, res) => {
  try {
    const groupMembers = await groupMemberServices.listGroupMember({
      params: req.params,
      query:req.query
    });
    res.status(200).json(groupMembers);
  } catch (error) {
    console.log("Failed to list member ", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
