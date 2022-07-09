require('dotenv').config();

module.exports = {
    port : process.env.PORT,
    environment: process.env.NODE_ENV,
    databaseUrl : process.env.dbUrl,
    apiPath: process.env.apiPath,
    secret: process.env.secret
}