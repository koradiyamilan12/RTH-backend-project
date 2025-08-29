const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Config = sequelize.define(
    "Config",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Configs",
      paranoid: true,
      timestamps: true,
    }
  );

  return Config;
};
