
const { Router } = require("express");
const { createProduct, fetchProduct, updateProduct, deleteProduct } = require("../controllers/product");
const checkAndValidateToken = require("../midddleware/auth");
const onlySeller = require("../midddleware/seller-routes")
const route = Router();



module.exports = (app) => {
    
    route.use(checkAndValidateToken);

    route.get('/:id', fetchProduct);

    route.use(onlySeller);

    route.post('/', createProduct);
    route.put('/:id', updateProduct);
    route.delete('/:id', deleteProduct);

    app.use('/product', route);

    //signin route
    //route.post('/signin', userSignIn);
    
}