const CustomError = require('./customError');
const { StatusCodes } = require('http-status-codes');
const { ERROR_MESSAGES } = require('../constants/messages');

class NotFoundError extends CustomError {
  constructor(message = ERROR_MESSAGES.USER_NOT_FOUND, details) {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}

class BadRequestError extends CustomError {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST, details) {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED, details) {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = ERROR_MESSAGES.FORBIDDEN, details) {
    super(message, StatusCodes.FORBIDDEN, details);
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError
};
