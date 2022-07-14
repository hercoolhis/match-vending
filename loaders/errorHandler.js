const logger = require("./logger");

const handle404 = (req, res, next) => {
    const err = new Error('This endpoint not found');
    err['status'] = 404;
    next(err);
}

const apiErrorHandler = (err, req, res, next) => {
    logger.error(err);
    res.status(err.statusCode || 500).json({ message: err.message});
}

const unCaughtExceptionAndUnhandledRejection = (error) => {
    logger.error(error.message, error);
    process.exit(1);        
}


module.exports = {
    handle404,
    apiErrorHandler,
    unCaughtExceptionAndUnhandledRejection
}