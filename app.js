const express = require("express");
require("dotenv").config();
const routes = require("./src/routes/index");
const errorHandler = require("./src/middlewares/errorHandler");
const { loadConfigsToCache } = require("./src/services/configService");
const swaggerUi = require("swagger-ui-express");
const fs = require('fs');
const YAML = require('js-yaml');
const path = require('path');

const app = express();
app.use(express.json());

const swaggerFile = path.join(__dirname, './src/api-docs/swagger.yaml');

const swaggerDocument = YAML.load(fs.readFileSync(swaggerFile, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

(async () => {
  try {
    await loadConfigsToCache();
    console.log("Config cache loaded at startup");
  } catch (err) {
    console.error("Failed to load config cache", err);
    process.exit(1);
  }
})();

app.use("/api", routes);

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs/`);
});
