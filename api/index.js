const { Router } = require("express");
const user = require("./routes/user");
const auth = require("./routes/auth");
const product = require("./routes/product");
const operation = require("./routes/operation");


module.exports = () => {
    const app = Router();
    user(app);
    auth(app);
    product(app);
    operation(app);

    return app;
}