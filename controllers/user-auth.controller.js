const { authUserServices } = require("../services");

exports.signUp = async (req, res) => {
  try {
    const user = await authUserServices.signUp({
      body: req.body,
      file: req.file,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log("unable to signup", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await authUserServices.signIn({
      body: req.body,
    });
    res.status(200).cookie("jwt", user.token).json(user);
  } catch (error) {
    console.log("unable to signup", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { token, user } = await authUserServices.googleAuth({
      body: req.body,
    });
    const cookieOptions = {
      secure: true,
      httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.log(error);
    console.log("unable to signup", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
