const expressLoader = require("./express");
const logger = require('./logger');

module.exports = async (app) => {
    try {
        await expressLoader(app);
        logger.info("Express App Loaded");
        return true
      } catch (error) {
        console.log(error.message);
        return false;
      }
}