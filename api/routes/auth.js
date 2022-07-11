
const { Router } = require("express");
const { userSignUp } = require("../controllers/auth")
const route = Router();



module.exports = (app) => {
    app.use('/auth', route);

    //signup route ...validate request body first
    //route.get('/signup', userSignUp);

    //signin route
    //route.post('/signin', userSignIn);
    
}