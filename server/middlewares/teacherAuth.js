const { Unauthorized } = require("../errors");

const teacherAuth = async (req, res, next) => {
  if (req.user.title === "teacher") {
    next();
  } else {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

module.exports = teacherAuth;
