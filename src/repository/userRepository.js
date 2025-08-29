const { Op } = require('sequelize');
const { User, Menu, sequelize } = require('../models');

const menuInclude = {
  model: Menu,
  as: 'menus',
  required: false,
  on: sequelize.literal(`"menus"."id" = ANY("User"."menuIds")`),
  where: { isDeleted: false }
};

const getAllUsers = async () => {
  return await User.findAll({
    where: { isDeleted: false },
    include: [menuInclude]
  });
};

const createUser = (data) => User.create(data);

const getUserById = async (id) => {
  return await User.findOne({
    where: { isDeleted: false, id },
    include: [menuInclude]
  });
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email, isDeleted: false } });
};

const updateUser = async (id, data) => {
  const [_, [updatedUser]] = await User.update(data, {
    where: { id },
    returning: true
  });
  return updatedUser;
};

const deleteUser = async (id) => {
  await User.update({ isDeleted: true }, { where: { id } });
};

const paginatedUsersRepo = async ({ filter = {}, sort = {}, page = {} }) => {
  const where = { isDeleted: false };

  if (filter.id) where.id = filter.id;
  else if (Array.isArray(filter.ids) && filter.ids.length)
    where.id = { [Op.in]: filter.ids };
  else if (filter.search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${filter.search}%` } },
      { email: { [Op.iLike]: `%${filter.search}%` } }
    ];
  }

  const order = [[sort.sortBy || 'id', (sort.orderBy || 'ASC')]];
  const limit = page.pageLimit || 10;
  const offset = (page.pageNumber || 0) * limit;

  const { count, rows } = await User.findAndCountAll({
    where,
    order,
    limit,
    offset,
    include: [menuInclude]
  });

  return {
    users: rows,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page.pageNumber || 0
  };
};

const upsertUserRepo = async (data) => {

  await User.upsert(data, { returning: true, logging: console.log });

  const user = await User.findOne({ where: { email: data.email } });

  const created = user.createdAt.getTime() === user.updatedAt.getTime();

  return { user, created };
};

const bulkUpsertUsersRepo = async (usersData) => {

  const uniqueUsersData = Array.from(
    new Map(usersData.map(user => [user.email, user])).values()
  );

  await User.bulkCreate(uniqueUsersData, {
    updateOnDuplicate: ['name', 'password', 'gender', 'updatedAt'],
    returning: true,
  });

  const emails = uniqueUsersData.map(u => u.email);
  const users = await User.findAll({ where: { email: emails } });

  const result = users.map(user => ({
    user,
    created: user.createdAt.getTime() === user.updatedAt.getTime(),
  }));

  return result;
};


module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  paginatedUsersRepo,
  upsertUserRepo,
  bulkUpsertUsersRepo
};
