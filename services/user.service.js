const { NotFound, BadRequest } = require("../libs/error");
const Model = require("../models/user.model");
const GroupMembers = require("../models/group-member.model").GroupMember;

const Users = Model.User;

exports.updateUser = async (payload) => {
  const { body, params } = payload;
  const id = params.id;
  if (!id) {
    throw new BadRequest("Data not given");
  }
  const updatedUser = await Users.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });

  if (!updatedUser) {
    throw new NotFound("User not found to update");
  } else {
    return updatedUser;
  }
};

exports.deleteUser = async (payload) => {
  const { id } = payload.params;
  if (!id) {
    throw new BadRequest("Data not given");
  }
  const deletedUser = await Users.findOneAndDelete({ _id: id });

  if (!deletedUser) {
    throw new NotFound("User not found to delete");
  } else {
    return deletedUser;
  }
};

exports.listUser = async (payload) => {
  // for adding members to group
  const { search } = payload.query;
  const { group_id } = payload.params;

  if (!group_id) {
    throw new BadRequest("Data not given");
  }

  let filters = {};
  if (search) {
    filters = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone_no: { $regex: search, $options: "i" } },
      ],
    };
  }

  const groupMembers = await GroupMembers.find({ group_id: group_id })
    .populate("member_id")
    .select("member_id");

  const ids = groupMembers.map((member) => ({ _id: member.member_id._id }));

  const users = await Users.find({ $and: [{ $nor: ids }, filters] });

  if (!users) {
    throw new NotFound("Users not found");
  } else {
    return users;
  }
};
