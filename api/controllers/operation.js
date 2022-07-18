const OperationService = require("../../services/operation");
const { DepositCoins, BuyProduct } = new OperationService();


const depositCoins = async (req, res, next) => {
    try {
        const { depositAmount } = req.body;

        await DepositCoins({ user: req.user, depositAmount });
    
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}

const buyProduct = async (req, res, next) => {
    try {
        const payload = { numberOfProducts: req.body.numberOfProducts, product: req.product, user: req.user }
        let result = await BuyProduct(payload);
    
        res.status(200).json(result);
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
    depositCoins,
    buyProduct
}