const { groupMemberServices } = require("../services");

exports.addMemberToGroup = async (req, res) => {
  try {
    const addedMember = await groupMemberServices.addMemberToGroup({
      body: req.body,
      params: req.params,
      admin: req.user,
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
      admin: req.user,
    });
    res.status(201).json(removedMember);
  } catch (error) {
    console.log("Failed to remove Member", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.listGroupOfParticularUser = async (req, res) => {
  try {
    const groupsOfParticularUser =
      await groupMemberServices.listGroupOfParticularUser({
        params: req.params,
      });
    res.status(201).json(groupsOfParticularUser);
  } catch (error) {
    console.log("Failed to list Group", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
