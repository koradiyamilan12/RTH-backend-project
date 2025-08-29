const { verifyToken } = require("../utils/jwt");
const { UnauthorizedError } = require("../utils/errors");
const { ERROR_MESSAGES } = require("../constants/messages");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return next(new UnauthorizedError(ERROR_MESSAGES.TOKEN_REQUIRED));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new UnauthorizedError(ERROR_MESSAGES.TOKEN_EXPIRED));
    }
    return next(new UnauthorizedError(ERROR_MESSAGES.TOKEN_INVALID));
  }
};

module.exports = authMiddleware;
