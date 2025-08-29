const { BadRequestError } = require("../utils/errors");
const { ERROR_MESSAGES } = require("../constants/messages");
const { getUserByEmail, updateUser, unblockUserRepo } = require("../repository/authRepository");
const { getConfigValue } = require("../services/configService");
const { comparePassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/jwt");

const loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new BadRequestError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
  }

  const user = await getUserByEmail(email);

  if (!user) {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  const configMaxAttempts = await getConfigValue("MAX_LOGIN_ATTEMPTS");
  const maxAttempts = Number(configMaxAttempts) || 5;

  const attempts = Number(user.attempts) || 0;

  if (attempts >= maxAttempts) {
    throw new BadRequestError(ERROR_MESSAGES.ACCOUNT_LOCKED);
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    await updateUser(user.id, { attempts: attempts + 1 });
    throw new BadRequestError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  await updateUser(user.id, { attempts: 0 });

  const token = generateToken({ id: user.id });

  return { user, token };
};

const unblockUserService = async ({ id }) => {
  if (!id) {
    throw new BadRequestError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
  }

  const user = await unblockUserRepo(id);

  if (!user) {
    throw new BadRequestError(ERROR_MESSAGES.ALREADY_UNBLOCKED);
  }

  return user;
};

module.exports = { loginService, unblockUserService };
