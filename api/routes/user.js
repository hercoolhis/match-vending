
const { Router } = require("express");
const { userSignUp, fetchUser, updateUser, deleteUser } = require("../controllers/user")
const route = Router();



module.exports = (app) => {
    
    //signup route ...validate request body first
    route.post('/', userSignUp);

    // fetch user
    route.get('/:id', fetchUser);

    // update user
    route.put('/:id', updateUser);

    // update user
    route.delete('/:id', deleteUser);

    app.use('/user', route);

    //signin route
    //route.post('/signin', userSignIn);
    
}