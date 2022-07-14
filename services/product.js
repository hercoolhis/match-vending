const logger = require("../loaders/logger");
const { createProduct, findProduct, updateProduct, deleteProduct } = require("../data-access/product");


module.exports = class ProductService {

    constructor() {        
        this.FetchProduct = this.FetchProduct.bind(this);
    }

    async CreateProduct(payload, seller) {
        try {
            const { productName } = payload;
            //get input    
            let doesProductExist = await findProduct({ productName });     

            if (doesProductExist) {
                const error = new Error('Product name already taken');
                error['status'] = 409;
                throw error;
            }

            logger.info("Creating Product"); 
            const product = await createProduct({
                ...payload,
            }, seller);         

            return {
                product
            }

        } catch ({ message, status }) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }
    
    async FetchProduct(payload) {
        try {
            const { id } = payload;

            logger.info("Fetching Product");
            let product = await findProduct({ id });

            if (!product) {
                const error = new Error('product not found');
                error['status'] = 404;
                throw error;
            }

            //return product details
            return {
                product
            }

        } catch ({message, status}) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

    async UpdateProduct(payload) {
        try {
            const { id, updateObject } = payload;

            logger.info("Updating Product");
            let product = await findProduct({ id });

            if (!product) {
                const error = new Error('product not found');
                error['status'] = 404;
                throw error;
            }

            await updateProduct(id, updateObject)

            return {
                success: true
            }

        } catch ({message, status}) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

    async DeleteProduct(payload) {
        try {
            const { id } = payload;

            logger.info("Deleting Product");
            let product = await findProduct({ id });

            if (!product) {
                const error = new Error('product not found');
                throw error;
            }

            await deleteProduct(id)

            return {
                success: true
            }

        } catch ({message, status}) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

}