var express = require('express');
const loaders = require("./loaders")
const path = require('path');
const app = express();
const logger = require("./loaders/logger");
const config = require("./config")
const { apiErrorHandler, handle404 } = require("./loaders/errorHandler");


app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// this serves as loader
const initiateApp = async () => {
  try {
    const appLoaded = await loaders(app);

    if (appLoaded) {
      const port = config.port || 3000;

      app.listen(port, (error) => {
        if (error) {
            logger.error(`Server failed to start, ${error.message}`);                    
            process.exit(1);                
        }
        logger.info(`your server is ready at port ${port}`);                
      })
    } else {
      throw new Error("Couldn't load app");
    }
   
  } catch (error) {
    console.log(error);
    logger.error(error.message);  
  }
}

initiateApp();

app.use(apiErrorHandler);
app.use(handle404);

module.exports = app;
