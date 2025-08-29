const CustomError = require('../utils/customError');
const generalResponse = require('../utils/generalResponse');
const { getInvalidRequestResponse, getInternalServerErrorResponse } = require('../utils/response');
const { ERROR_MESSAGES } = require('../constants/messages');

// In production, replace console with Winston/Pino
const logger = console;

function errorHandler(err, req, res, next) {
  // Log for internal debugging/tracking
  logger.error({
    message: err.message,
    stack: err.stack,
    details: err.details || null,
    path: req.originalUrl,
    method: req.method
  });

  // Handle known operational errors (our custom errors)
  if (err instanceof CustomError) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message)
    );
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const validationMessage = err.errors.map(e => e.message).join(', ');
    return generalResponse(res, null, getInvalidRequestResponse(validationMessage)
    );
  }

  // Handle unexpected errors (fallback)
  return generalResponse(res, null, getInternalServerErrorResponse(ERROR_MESSAGES.SERVER_ERROR)
  );
}

module.exports = errorHandler;
