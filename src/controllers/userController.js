const { getAllUsersService, createNewUserService, getUserByIdService, updateUserService, deleteUserService, paginatedUsersService, upsertUserService, bulkUpsertUsersService } = require('../services/userService');
const generalResponse = require('../utils/generalResponse');
const { getOkResponse, getCreatedResponse, getUpdatedResponse, getDeletedResponse, getPaginatedUsers, getUpsertedResponse } = require('../utils/response');
const { SUCCESS_MESSAGES } = require('../constants/messages');

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    return generalResponse(res, users, getOkResponse(SUCCESS_MESSAGES.USER_FETCHED));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    return generalResponse(res, user, getOkResponse(SUCCESS_MESSAGES.USER_FETCHED));
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await createNewUserService(req.body, req?.user?.id);
    return generalResponse(res, user, getCreatedResponse(SUCCESS_MESSAGES.USER_CREATED));
  } catch (err) {
    next(err);
  }
};


const updateUser = async (req, res, next) => {
  try {
    const { user } = await updateUserService(req.params.id, req.body);
    return generalResponse(res, user, getUpdatedResponse(SUCCESS_MESSAGES.USER_UPDATED));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await deleteUserService(req.params.id);
    return generalResponse(res, null, getDeletedResponse(SUCCESS_MESSAGES.USER_DELETED));
  } catch (err) {
    next(err);
  }
};

const paginatedUsers = async (req, res, next) => {
  try {
    const result = await paginatedUsersService(req.body);
    return generalResponse(res, result, getPaginatedUsers(SUCCESS_MESSAGES.USER_PAGINATED));
  } catch (err) {
    next(err);
  }
};

const upsertUser = async (req, res, next) => {
  try {
    const result = await upsertUserService(req.body);

    const response = getUpsertedResponse(
      result.created,
      SUCCESS_MESSAGES.USER_CREATED,
      SUCCESS_MESSAGES.USER_UPDATED
    );

    return generalResponse(res, result.user, response);
  } catch (err) {
    next(err);
  }
};

const bulkUpsertUsers = async (req, res, next) => {
  try {
    let users = await bulkUpsertUsersService(req.body);

    users = users.map(item => ({
      ...item,
      message: getUpsertedResponse(
        item.created,
        SUCCESS_MESSAGES.USER_CREATED,
        SUCCESS_MESSAGES.USER_UPDATED
      ).message
    }));

    return generalResponse(res, users, getOkResponse(SUCCESS_MESSAGES.BULK_UPSERT_COMPLETED));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  paginatedUsers,
  upsertUser,
  bulkUpsertUsers,
};
