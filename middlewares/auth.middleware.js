const jwt = require("jsonwebtoken");
const Modle = require("../models/user.model");
const Users = Modle.User;
const { UnAuthorized } = require("../libs/error");

exports.jwtTokenValidation = async (req, res, next) => {
  let token;
  try {
    token = req?.cookies?.jwt;
    if (token) {
      const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(authenticatedUser.id).select("-password");
      next();
      console.log("successfully authenticate");
    } else {
      throw new UnAuthorized("No Token");
    }
  } catch (error) {
    throw new UnAuthorized("Not authorized");
  }
};
