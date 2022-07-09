const bodyParser = require("body-parser");
const { apiErrorHandler, handle404, unCaughtExceptionAndUnhandledRejection } = require("./errorHandler");
var path = require('path');
var cookieParser = require('cookie-parser');
var express = require('express');
//config = require("../config"),
//routes = require("../api"),
const cors = require("cors");
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


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

    

    //app.use('/', indexRouter);
    //app.use('/users', usersRouter);
    //app.use(config.apiPath, routes());


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