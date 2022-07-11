const bodyParser = require("body-parser");
const { apiErrorHandler, handle404, unCaughtExceptionAndUnhandledRejection } = require("./errorHandler");
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const config = require("../config");
const routes = require("../api");
const cors = require("cors");
//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');


module.exports = async (app) => {

    app.use(bodyParser.json());  
    app.use(cors());

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    //app.use(logger('dev'));
    //app.use(express.json());
    //app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'public')));

    console.log(config.apiPath);

    //app.use('/', indexRouter);
    //app.use('/users', usersRouter);
    app.use(config.apiPath, routes());


    //error handling
    app.use(apiErrorHandler);
    app.use(handle404);
    process.on('uncaughtException', (error) => {
        unCaughtExceptionAndUnhandledRejection(error);
    })
    
    process.on('unhandledRejection', (error) => {
        unCaughtExceptionAndUnhandledRejection(error);
    })

    return app;
}