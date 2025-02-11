const express = require("express");
const router = express.Router();
const { jwtTokenValidation } = require("../middlewares/auth.middleware");
router.use("/auth", require("./user-auth.route"));
router.use("/users", jwtTokenValidation, require("./user.route"));
router.use("/groups", jwtTokenValidation, require("./group.router"));
router.use(
  "/groups/members",
  jwtTokenValidation,
  require("./group-member.router"),
);
router.use("/expense", jwtTokenValidation, require("./expense.router"));
router.use(
  "/expense/participants",
  jwtTokenValidation,
  require("./expense-participant.router"),
);

module.exports = router;
