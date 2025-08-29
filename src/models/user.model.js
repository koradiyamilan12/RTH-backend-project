const { DataTypes } = require('sequelize');
const GenderEnum = require('../constants/genderEnum');
const { hashPassword } = require('../utils/hashPassword');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      menuIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: [],
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(GenderEnum)),
        allowNull: false,
      },
      attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdById: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: 'Users',
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await hashPassword(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await hashPassword(user.password);
          }
        },
      },
    }
  );

  // sanitize response (don’t leak password/attempts to client)
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    delete values.attempts;
    return values;
  };

  return User;
};
