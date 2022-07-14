
const { Router } = require("express");
const { createProduct, fetchProduct, updateProduct, deleteProduct } = require("../controllers/product")
const route = Router();



module.exports = (app) => {
    
    //signup route ...validate request body first
    route.post('/', createProduct);

    // fetch user
    route.get('/:id', fetchProduct);

    // update user
    route.put('/:id', updateProduct);

    // update user
    route.delete('/:id', deleteProduct);

    app.use('/product', route);

    //signin route
    //route.post('/signin', userSignIn);
    
}