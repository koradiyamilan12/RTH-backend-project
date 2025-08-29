const sequelize = require('../config/db');
const UserModel = require('./user.model');
const SessionModel = require('./session.model');
const MenuModel = require('./menu.model');
const ConfigModel = require('./Config');

const User = UserModel(sequelize);
const Session = SessionModel(sequelize);
const Menu = MenuModel(sequelize);
const Config = ConfigModel(sequelize);

// User <-> Session
User.hasMany(Session, {
  foreignKey: 'userId',
  as: 'sessions',
});
Session.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User <-> Menu
User.hasMany(Menu, {
  foreignKey: 'userId',
  as: 'menus',
});
Menu.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});


// User self-reference
User.belongsTo(User, {
  as: 'createdBy',
  foreignKey: 'createdById',
});

module.exports = { sequelize, User, Session, Menu, Config };
