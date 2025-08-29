const { getAllConfigs, getConfigByKey, bulkUpsertConfig } = require("../repository/configRepository");
const { BadRequestError } = require("../utils/errors");
const { ERROR_MESSAGES } = require("../constants/messages");

const configCache = {};

const loadConfigsToCache = async () => {
  const configs = await getAllConfigs();
  configs.map(c => {
    configCache[c.key] = c.value;
  });
  return configCache;
};

const getConfigValue = async (key) => {

  if (configCache[key]) {
    return configCache[key];
  }

  const config = await getConfigByKey(key);
  if (!config) {
    return null;
  }

  configCache[config.key] = config.value;

  return config.value;
};

const updateConfigs = async (data) => {
  const configs = Object.entries(data).map(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      throw new BadRequestError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
    }
    if (isNaN(value)) {
      throw new BadRequestError(ERROR_MESSAGES.INVALID_NUMBER);
    }
    return { key, value: String(value) };
  });

  await bulkUpsertConfig(configs);

  configs.map(({ key, value }) => {
    configCache[key] = value;
  });

  return configCache;
};

module.exports = {
  loadConfigsToCache,
  getConfigValue,
  updateConfigs,
};
