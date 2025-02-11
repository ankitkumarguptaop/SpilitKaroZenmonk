const { NotFound, BadRequest } = require("../libs/error");
const Model = require("../models/group.model");
const GroupMembers = require("../models/group-member.model").GroupMember;
const Groups = Model.Group;

exports.createGroup = async (payload) => {
  const { name, description } = payload.body;
  const { user_id } = payload.params;
  if (!name || !user_id) {
    throw new BadRequest("Data not given!");
  }
  const createdGroup = new Groups({
    created_by: user_id,
    name: name,
    description: description,
  });
  const group = await createdGroup.save();

  const addedMember = new GroupMembers({
    group_id: group._id,
    member_id: user_id,
  });
  await addedMember.save();

  return group;
};

exports.deleteGroup = async (payload) => {
  const { id } = payload.params;
  const deletedGroup = await Groups.findOneAndDelete({ _id: id });
  await GroupMembers.deleteMany({ group_id: id });
  if (!deletedGroup) {
    throw new NotFound("Group not found to delete");
  } else {
    return deletedGroup;
  }
};

exports.updateGroup = async (payload) => {
  const { body, params } = payload;
  const id = params.id;
  const updatedGroup = await Groups.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!updatedGroup) {
    throw new NotFound("Group not found to update");
  } else {
    return updatedGroup;
  }
};
