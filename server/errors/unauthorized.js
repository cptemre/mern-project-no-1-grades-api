const Custom_Error = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class Unauthorized extends Custom_Error {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthorized