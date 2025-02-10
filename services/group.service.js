const { NotFound } = require("../libs/error");
const Model = require("../models/group.model");
const Group = Model.Group;

exports.createGroup = async (payload) => {
  const { name, description } = payload.body;
  const { user_id } = payload.params;
  if (!name || !user_id) {
    throw new BadRequest("Data not given!");
  }
  const createdGroup = new Group({
    created_by: user_id,
    name: name,
    description: description
  });
  return await createdGroup.save();
};

exports.deleteGroup = async (payload) => {
  const { id } = payload.params;
  const deletedGroup = await Group.findOneAndDelete({ _id: id }, { new: true });

  if (!deletedGroup) {
    throw new NotFound("Group not found to delete");
  } else {
    return deletedGroup;
  }
};


exports.updateGroup = async (payload) => {
  const { body, params } = payload;
  const id = params.id;
  const updatedGroup = await Group.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!updatedGroup) {
    throw new NotFound("Group not found to update");
  } else {
    return updatedGroup;
  }
};