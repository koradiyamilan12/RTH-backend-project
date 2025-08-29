const { getAllMenusService, createNewMenuService, getMenuByIdService, updateMenuService, deleteMenuService, filterMenusService } = require('../services/menuService');
const generalResponse = require('../utils/generalResponse');
const { getOkResponse, getCreatedResponse, getUpdatedResponse, getDeletedResponse, getInvalidRequestResponse, getInternalServerErrorResponse, getFilterMenus, } = require('../utils/response');
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = require('../constants/messages');

const getMenus = async (req, res) => {
  try {
    const menus = await getAllMenusService();
    return generalResponse(res, menus, getOkResponse(SUCCESS_MESSAGES.MENU_FETCHED));
  } catch (err) {
    return generalResponse(res, null, getInternalServerErrorResponse(ERROR_MESSAGES.SERVER_ERROR));
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await getMenuByIdService(req.params.id);
    return generalResponse(res, menu, getOkResponse(SUCCESS_MESSAGES.MENU_FETCHED));
  } catch (err) {
    return generalResponse(res, null, getInternalServerErrorResponse(ERROR_MESSAGES.SERVER_ERROR));
  }
};

const createMenu = async (req, res) => {
  try {
    const menu = await createNewMenuService(req.body);
    return generalResponse(res, menu, getCreatedResponse(SUCCESS_MESSAGES.MENU_CREATED));
  } catch (err) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

const updateMenu = async (req, res) => {
  try {
    const menu = await updateMenuService(req.params.id, req.body);
    return generalResponse(res, menu, getUpdatedResponse(SUCCESS_MESSAGES.MENU_UPDATED));
  } catch (err) {
    console.log(err)
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

const deleteMenu = async (req, res) => {
  try {
    const result = await deleteMenuService(req.params.id);
    return generalResponse(res, result, getDeletedResponse(SUCCESS_MESSAGES.MENU_DELETED));
  } catch (err) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

const filterMenus = async (req, res) => {
  try {
    const result = await filterMenusService(req.body);
    return generalResponse(res, result, getFilterMenus(SUCCESS_MESSAGES.USER_PAGINATED));
  } catch (err) {
    return generalResponse(res, null, getInvalidRequestResponse(err.message));
  }
};

module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  filterMenus,
};
