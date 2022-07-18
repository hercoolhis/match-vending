
const { Router } = require("express");
const { depositCoins, buyProduct } = require("../controllers/operation");
const checkAndValidateToken = require("../midddleware/auth")
const onlyBuyer = require("../midddleware/buyer-routes");
const validDepositAmount = require("../midddleware/valid-deposit-amount");
const canAffordCart = require("../midddleware/can-afford-cart")
const route = Router();



module.exports = (app) => {

    route.use(checkAndValidateToken);
    route.use(onlyBuyer)
    
    route.post('/deposit', validDepositAmount, depositCoins);
    route.post('/buy', canAffordCart, buyProduct);
    //route.post('/reset', userSignUp);

    app.use('/operation', route);

    //signin route
    //route.post('/signin', userSignIn);
    
}