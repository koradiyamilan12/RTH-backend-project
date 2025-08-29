const { SUCCESS_MESSAGES } = require("../constants/messages");
const { updateConfigs } = require("../services/configService");
const generalResponse = require("../utils/generalResponse");

const setMaxLoginAttempts = async (req, res, next) => {
  try {
    const config = await updateConfigs(req.body);
    return generalResponse(res, config, SUCCESS_MESSAGES.LOGIN_ATTEMPTS_UPDATED);
  } catch (error) {
    next(error);
  }
};

module.exports = { setMaxLoginAttempts };
