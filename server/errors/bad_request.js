const Custom_Error = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class Bad_Request extends Custom_Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = Bad_Request;
