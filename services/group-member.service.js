const { NotFound, ForBidden, BadRequest } = require("../libs/error");
const GroupMembers = require("../models/group-member.model").GroupMember;
const Users = require("../models/user.model").User;
const Groups = require("../models/group.model").Group;

exports.addMemberToGroup = async (payload) => {
  const { usersToAdd } = payload.body;
  const { group_id } = payload.params;
  const { currentUser } = payload;
  if (!group_id || !currentUser) {
    throw new BadRequest("Data not given!");
  }
  const group = await Groups.findOne({ _id: group_id });
  if (!group) {
    throw new NotFound("group doesnt exists!");
  }
  if (JSON.stringify(currentUser._id) !== JSON.stringify(group.created_by)) {
    throw new ForBidden("You dont have the access to add user");
  }

  return await GroupMembers.insertMany(usersToAdd);
};

exports.removeMemberFromGroup = async (payload) => {

  console.log(payload);

  const { group_id } = payload.params;
  const { removeMembers } = payload.body;
  const { currentUser } = payload;


  console.log(removeMembers);

  if (!group_id) {
    throw new BadRequest("Data not given!");
  }
  const group = await Groups.findOne({ _id: group_id });
  if (!group) {
    throw new NotFound("Group not found");
  }

  if (JSON.stringify(currentUser._id) !== JSON.stringify(group.created_by)) {
    throw new ForBidden("You dont have the access to remove user");
  }


  const removedMember = await GroupMembers.deleteMany({
    $or: removeMembers,
  });
  if (!removedMember) {
    throw new NotFound("GroupMember not found to remove");
  } else {
    return removedMember;
  }
};

exports.listGroupMember = async (payload) => {
  const { group_id } = payload.params;
  const { search } = payload.query;

  console.log(payload)

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
  console.log(filters)
  const groupMembers = await GroupMembers.find({$and : [{ group_id: group_id } , filters]})
    .populate("member_id")
    .select("member_id");
  if (!groupMembers) {
    throw new NotFound("group members are not there");
  } else {
    return groupMembers;
  }
};
