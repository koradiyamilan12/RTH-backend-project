const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Menu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    itemDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    timestamps: true,
    paranoid: true,
    tableName: 'Menus',
  });
};
