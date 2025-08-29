const { Op } = require('sequelize');
const {Menu} = require('../models');

const getAllMenus = () => Menu.findAll({
  where: { isDeleted: false }
});

const createMenu = (data) => Menu.create(data);

const getMenuById = (id) => Menu.findOne({
  where: { isDeleted: false, id }
});

const updateMenu = async (id, data) => {
  const [count, [updatedMenu]] = await Menu.update(data, {
    where: { id, isDeleted: false },
    returning: true
  });
  return count ? updatedMenu : null;
};

const deleteMenu = (id) => Menu.update(
  { isDeleted: true },
  { where: { id } }
);

const filterMenusRepo = async ({ filter = {}, sort = {}, page = {} }) => {
  const where = { isDeleted: false };

  if (filter.search) {
    where[Op.or] = [
      { itemName: { [Op.iLike]: `%${filter.search}%` } },
      { itemDescription: { [Op.iLike]: `%${filter.search}%` } }
    ];
  }

  if (filter.id) where.id = filter.id;
  if (filter.ids && filter.ids.length) where.id = { [Op.in]: filter.ids };

  const order = [[sort.sortBy || 'id', sort.orderBy || 'ASC']];
  const limit = page.pageLimit || 10;
  const offset = ((page.pageNumber || 1) - 1) * limit;

  const { count, rows } = await Menu.findAndCountAll({
    where,
    order,
    limit,
    offset
  });

  return {
    menus: rows,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page.pageNumber || 1
  };
};

module.exports = {
  getAllMenus,
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
  filterMenusRepo,
};
