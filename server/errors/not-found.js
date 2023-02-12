const Custom_Error = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class Not_Found extends Custom_Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = Not_Found