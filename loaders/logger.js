const winston = require("winston");
const path = require("path");
const config = require("../config")


let transports = [];
let logPath = '';

if (config.environment !== 'development') {
    transports.push(
        new winston.transports.File({
            filename: path.join(logPath, 'error.log'),
            level: 'error'
        })
    )
} else {
    transports = [
        new winston.transports.Console()
    ]
}


const LoggerInstance = winston.createLogger({
    level: 'info',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
    transports
})

module.exports = LoggerInstance;