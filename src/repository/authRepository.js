const { User } = require('../models');
const { Op } = require('sequelize');

const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email, isDeleted: false }
  });
};

const getUserById = async (id) => {
  return await User.findOne({
    where: { id, isDeleted: false }
  });
};

const updateUser = async (id, updateData) => {
  const [updated] = await User.update(updateData, {
    where: { id, isDeleted: false },
    returning: true
  });
  return updated ? await getUserById(id) : null;
};

const unblockUserRepo = async (id) => {

  const [updated, [user]] = await User.update(
    { attempts: 0 },
    {
      where: { id, isDeleted: false, attempts: { [Op.gt]: 0 } },
      returning: true,
    }
  );

  return updated ? user : null;
};


module.exports = {
  getUserByEmail,
  getUserById,
  updateUser,
  unblockUserRepo
};
