const { Unauthorized } = require("../errors");

const teacherAuth = async (req, res, next) => {
  if (req.user.user === "teacher") {
    next();
  } else {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

module.exports = teacherAuth;
