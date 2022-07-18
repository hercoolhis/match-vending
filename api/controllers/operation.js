const OperationService = require("../../services/operation");
const { DepositCoins, BuyProduct, ResetDeposit } = new OperationService();


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

const resetDeposit = async (req, res, next) => {
    try {
        let result = await ResetDeposit({ user: req.user });
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
    
}


module.exports = {
    depositCoins,
    buyProduct,
    resetDeposit
}