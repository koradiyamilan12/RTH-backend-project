const { getAllMenus, createMenu, getMenuById, updateMenu, deleteMenu, filterMenusRepo, } = require('../repository/menuRepository');
const { ERROR_MESSAGES } = require('../constants/messages');

const getAllMenusService = () => getAllMenus();

const createNewMenuService = (data) => createMenu(data);

const getMenuByIdService = async (id) => {
  const menu = await getMenuById(id);
  if (!menu) throw new Error(ERROR_MESSAGES.MENU_NOT_FOUND);
  return menu;
};

const updateMenuService = async (id, data) => {
  const menu = await updateMenu(id, data);
  if (!menu) throw new Error(ERROR_MESSAGES.MENU_NOT_FOUND);
  return menu;
};

const deleteMenuService = async (id) => {
  const deletedMenu = await deleteMenu(id);
  if (!deletedMenu) throw new Error(ERROR_MESSAGES.MENU_NOT_FOUND);
  return deletedMenu;
};

const filterMenusService = (data) => filterMenusRepo(data);

module.exports = {
  getAllMenusService,
  createNewMenuService,
  getMenuByIdService,
  updateMenuService,
  deleteMenuService,
  filterMenusService,
};
