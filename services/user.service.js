const { NotFound } = require("../libs/error");
const Model = require("../models/user.model");
const Users = Model.User;

exports.updateUser = async (payload) => {
  const { body, params } = payload;
  const id = params.id;
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
  const deletedUser = await Users.findOneAndDelete({ _id: id }, { new: true });

  if (!deletedUser) {
    throw new NotFound("User not found to delete");
  } else {
    return deletedUser;
  }
};

exports.getUser = async (payload) => {
  const { id } = payload.params;
  const user = await Users.findOne({ _id: id });
  
  if (!user) {
    throw new NotFound("User not found");
  } else {
    return user;
  }
};

exports.listUser = async (payload) => {
  const { search } = payload.query;
  const { id } = payload.params;

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
  const users = await Users.find({$and: [{$nor : [{_id:id}]},filters]});
  if (!users) {
    throw new NotFound("Users not found ");
  } else {
    return users;
  }
};
