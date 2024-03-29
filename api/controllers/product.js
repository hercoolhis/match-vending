const ProductService = require("../../services/product");
const { FetchProduct, UpdateProduct, DeleteProduct, CreateProduct, FetchAllProducts } = new ProductService();


const createProduct = async (req, res, next) => {
    try {
        const payload = {
            ...req.body,
            seller: req.user
        }
        let createProduct = await CreateProduct(payload);
    
        res.status(201).json(createProduct);
    } catch (error) {
        next(error);
    }
}

const fetchProduct = async (req, res, next) => {
    try {
        let fetchedProduct = await FetchProduct();
    
        res.status(200).json(fetchedProduct);
    } catch (error) {
        next(error);
    }
    
}

const fetchAllProducts = async (req, res, next) => {
    try {
        let fetchedProducts = await FetchAllProducts();
    
        res.status(200).json(fetchedProducts);
    } catch (error) {
        next(error);
    }
    
}

const updateProduct = async (req, res, next) => {
    try {
        const { updateObject } = req.body;
        const { id } = req.params;

        let result = await UpdateProduct({ id, updateObject });
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
    
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await DeleteProduct({ id });
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
    
}



module.exports = {
    createProduct,
    fetchProduct,
    updateProduct,
    deleteProduct,
    fetchAllProducts
}