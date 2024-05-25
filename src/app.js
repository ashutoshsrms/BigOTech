const express = require("express");
const sequelize = require("./config/database");
const formRoutes = require("./routes/formRoutes");
const logger = require("./utils/logger");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/api", formRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });
