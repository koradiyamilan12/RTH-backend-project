const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'Sessions',
  });
};
