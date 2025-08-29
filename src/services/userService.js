const { getAllUsers, createUser, getUserById, updateUser, paginatedUsersRepo, deleteUser, getUserByEmail, upsertUserRepo, bulkUpsertUsersRepo } = require('../repository/userRepository');
const GenderEnum = require('../constants/genderEnum');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const { ERROR_MESSAGES } = require('../constants/messages');

const getAllUsersService = () => getAllUsers();

const createNewUserService = async (data, createdById) => {
  const { name, email, password, gender } = data;

  if (!name || !email || !password || !gender) {
    throw new BadRequestError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_EMAIL_FORMAT);
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new BadRequestError(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
  }

  const allowedGenders = Object.values(GenderEnum);
  if (!allowedGenders.includes(gender.toUpperCase())) {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_GENDER);
  }

  const user = await createUser({ ...data, createdById });
  return user;
};


const getUserByIdService = async (id) => {
  const user = await getUserById(id);
  if (!user) throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
  return user;
};

const updateUserService = async (id, data) => {
  const existingUser = await getUserById(id);
  if (!existingUser) throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
  const updatedUser = await updateUser(id, data);
  return updatedUser;
};

const deleteUserService = async (id) => {
  const user = await getUserById(id);
  if (!user) throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);

  await deleteUser(id);
};

const paginatedUsersService = async (data) => {
  return await paginatedUsersRepo(data);
};

const upsertUserService = async (data) => {
  const { user, created } = await upsertUserRepo(data);

  if (!data || typeof data !== 'object') {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_OBJECT_DATA_FORMAT);
  }

  return { user, created };
};

const bulkUpsertUsersService = async (usersData) => {

  if (!Array.isArray(usersData) || usersData.length === 0) {
    throw new BadRequestError(ERROR_MESSAGES.INVALID_ARRAY_DATA_FORMAT);
  }

  if (usersData.some(user => !user.name || !user.email || !user.password || !user.gender)) {
    throw new BadRequestError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
  }

  const users = await bulkUpsertUsersRepo(usersData);
  return users;
};

module.exports = {
  getAllUsersService,
  createNewUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  paginatedUsersService,
  upsertUserService,
  bulkUpsertUsersService,
};
