require('dotenv').config();

module.exports = {
    port : process.env.PORT,
    environment: process.env.NODE_ENV,
    host: process.env.dbHost,
    databaseUrl : process.env.dbUrl,
    databaseName: process.env.dbName,
    databaseUser: process.env.dbUser,
    databasePass: process.env.dbPass,
    apiPath: process.env.apiPath,
    secret: process.env.secret
}