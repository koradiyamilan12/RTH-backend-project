const { Session, User } = require('../models/index');

const getAllSession = async () => {
  try {
    const sessions = await Session.findAll({
      where: { isDeleted: false },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
        where: { isDeleted: false },
      }],
    });
    return sessions;
  } catch (error) {
    console.error('getAllSession error:', error);
    throw error;
  }
};

const getSessionById = async (id) => {
  const data = await Session.findOne({
    where: { isDeleted: false, id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
        where: { isDeleted: false }
      },
    ],
  })
  return data;
};

const createSession = (data) => Session.create(data);

const updateSession = async (id, data) => {
  const [count, [updatedSession]] = await Session.update(data, {
    where: { id, isDeleted: false },
    returning: true
  });
  return count ? updatedSession : null;
};

const deleteSession = (id) => Session.update(
  { isDeleted: true },
  { where: { id } }
);

module.exports = {
  getAllSession,
  createSession,
  getSessionById,
  updateSession,
  deleteSession
}