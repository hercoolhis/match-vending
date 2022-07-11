
const { Router } = require("express");
const { userSignUp } = require("../controllers/user")
const route = Router();



module.exports = (app) => {
    app.use('/user', route);

    //signup route ...validate request body first
    route.get('/', userSignUp);

    //signin route
    //route.post('/signin', userSignIn);
    
}