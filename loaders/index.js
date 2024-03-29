const expressLoader = require("./express");
const databaseLoader = require("./database");
const logger = require('./logger');

module.exports = async (app) => {
    try {
        await expressLoader(app);
        logger.info("Express App Loaded");

        await databaseLoader()
        logger.info("Database connection successful");
        return true
      } catch (error) {
        console.log(error.message);
        return false;
      }
}