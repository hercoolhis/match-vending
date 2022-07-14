const { Router } = require("express");
const user = require("./routes/user");
const auth = require("./routes/auth");
const product = require("./routes/product");


module.exports = () => {
    const app = Router();
    user(app);
    auth(app);
    product(app);

    return app;
}