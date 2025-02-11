const { NotFound, ForBidden, BadRequest } = require("../libs/error");
const GroupMembers = require("../models/group-member.model").GroupMember;
const Users = require("../models/user.model").User;
const Groups = require("../models/group.model").Group;

exports.addMemberToGroup = async (payload) => {
  const { user_id } = payload.body;
  const { group_id } = payload.params;
  const { admin } = payload;
  if (!user_id || !group_id) {
    throw new BadRequest("Data not given!");
  }
  const user = await Users.findOne({ _id: user_id });
  if (!user) {
    throw new NotFound("User doesnt  exists!");
  }
  const group = await Groups.findOne({ _id: group_id });

  if (!group) {
    throw new NotFound("group doesnt exists!");
  }
  if (JSON.stringify(admin._id) !== JSON.stringify(group.created_by)) {
    throw new ForBidden("You dont have the access to add user");
  }

  const isMemberAlreadyPresent = await GroupMembers.findOne({
    $and: [{ group_id: group_id }, { member_id: user_id }],
  });
  console.log("isMemberAlreadyPresent", isMemberAlreadyPresent);
  if (isMemberAlreadyPresent) {
    throw new ForBidden(" Member already exists in group!");
  } else {
    const addedMember = new GroupMembers({
      group_id: group_id,
      member_id: user_id,
    });
    return await addedMember.save();
  }
  return;
};

exports.removeMemberFromGroup = async (payload) => {
  const { group_id, user_id } = payload.params;
  const { admin } = payload;

  const group = await Groups.findOne({ _id: group_id });
  if (!group) {
    throw new NotFound("Group not found");
  }

  if (JSON.stringify(admin._id) !== JSON.stringify(group.created_by)) {
    throw new ForBidden("You dont have the access to remove user");
  }

  const removedMember = await GroupMembers.findOneAndDelete({
    member_id: user_id,
    group_id: group_id,
  });
  if (!removedMember) {
    throw new NotFound("GroupMember not found to remove");
  } else {
    return removedMember;
  }
};

exports.listGroupOfParticularUser = async (payload) => {
  const { user_id } = payload.params;
  const allGroups = await GroupMembers.find({ member_id: user_id }).populate(
    "group_id",
  );
  if (!allGroups) {
    throw new NotFound("Groups are not there");
  } else {
    return allGroups;
  }
};
