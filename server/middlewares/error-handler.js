const { StatusCodes } = require("http-status-codes");

const error_handler = (err, req, res, next) => {
  // CUSTOM ERROR
  const customError = {
    msg: err.message || "SOMETHING WENT WRONG",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  // MONGOOSE UNIQUE ERROR
  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)} ALREADY EXISTS`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // MONGOOSE MODEL VALIDATION ERRORS AS ARRAY
  // ! EXAMPLE: msg: ["PASSWORD IS TOO SHORT", "SURNAME IS TOO SHORT"]
  if (err.name === "ValidationError") {
    customError.msg = Object.keys(err.errors).map(
      (key) => err.errors[key].message
    );
  }
  // TODO - CAST ERROR WILL BE ADDED HERE FOR WRONG IDS
  console.log(err);
  return res
    .status(customError["statusCode"])
    .json({ msg: customError["msg"] });
};

module.exports = error_handler;
