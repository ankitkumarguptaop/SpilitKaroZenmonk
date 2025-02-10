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
