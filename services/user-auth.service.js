const Model = require("../models/user.model");
const Users = Model.User;
const jwt = require("jsonwebtoken");

const { ForBidden, BadRequest, UnAuthorized } = require("../libs/error");

exports.signUp = async (payload) => {
  const { body, file } = payload;
  const avatar = file ? file.path : null;
  console.log(body);
  console.log(avatar)
  const { name, password, email, phone_no } = body;
  if (!name || !password || !email || !avatar || !phone_no) {
    throw new BadRequest("Data not given!");
  }
  const user = await Users.findOne({ email });
  if (user) {
    throw new ForBidden("User already signup!");
  } else {
    const signedUser = new Users({ ...body, avatar: avatar });
    return await signedUser.save();
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

exports.signIn = async (payload) => {
  const { email, password } = payload.body;
  console.log(email, password);
  if (!email || !password) {
    throw new BadRequest("Data not given");
  }
  const user = await Users.findOne({ email: email });

  if (!user) {
    throw new ForBidden("Need to register First!");
  }
  if (await user.matchPassword(password)) {
    return { token: generateToken(user._id), user: user };
  } else {
    throw new UnAuthorized("Unauthorised access Password not matched!");
  }
};


exports.googleAuth = async (payload) => {
  const { body } = payload;
  const { email, name, avatar } = body;
  if ((!email || !name  || !avatar)) {
    throw new BadRequest(" required data not given!");
  }
  const user = await Users.findOne({ email: email });
  if (user) {
    return { token: generateToken(user._id), user: user };
  } else {
    const createUser = new Users({ ...body });
    await createUser.save();
    return { token: generateToken(createUser._id), user: createUser };
  }
};
