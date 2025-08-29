const { loginService, unblockUserService } = require("../services/authService");
const { getOkResponse } = require("../utils/response");
const generalResponse = require("../utils/generalResponse");
const { SUCCESS_MESSAGES } = require("../constants/messages");

const login = async (req, res, next) => {
  try {
    const { user, token } = await loginService(req.body);

    return generalResponse(res, { user, token }, getOkResponse(SUCCESS_MESSAGES.LOGIN_SUCCESS));
  } catch (err) {
    next(err);
  }
};

const unblockUser = async (req, res, next) => {
  try {
    const user = await unblockUserService(req.body);

    return generalResponse(res, { user }, getOkResponse(SUCCESS_MESSAGES.UNBLOCK_SUCCESS));
  } catch (err) {
    next(err);
  }
};

const verifyTokenController = async (req, res, next) => {
  try {
    return generalResponse(res, { decoded: req.user }, getOkResponse(SUCCESS_MESSAGES.TOKEN_VALID));
  } catch (err) {
    next(err);
  }
};

module.exports = { login, unblockUser, verifyTokenController };
