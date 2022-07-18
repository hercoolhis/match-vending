const { DataSource }  = require("typeorm");
const config = require("../config");
const User = require("../entities/user");
const Product = require("../entities/product");
const Purchase = require("../entities/purchase")


module.exports = async () => {

    const connection = new DataSource({
        type: 'postgres',
        host: config.host || 'localhost',
        username: config.databaseUser,
        password: config.databasePass,
        port: 5432,
        ssl:
            config.host === 'localhost'
                ? false
                : { rejectUnauthorized: false },
        database: config.databaseName,
        entities: [User, Product, Purchase],
        synchronize: true,
    });

    await connection.initialize();

    return connection;
}