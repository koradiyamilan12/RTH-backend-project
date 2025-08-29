const { Config } = require("../models");

const getAllConfigs = async () => {
  return await Config.findAll();
};

const getConfigByKey = async (key) => {
  return await Config.findOne({ where: { key } });
};

const bulkUpsertConfig = async (configs) => {
  return await Config.bulkCreate(configs, {
    updateOnDuplicate: ["value", "updatedAt"],
  });
};

module.exports = {
  getAllConfigs,
  getConfigByKey,
  bulkUpsertConfig,
};
