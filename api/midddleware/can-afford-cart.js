const { findProduct } = require("../../data-access/product");

const canAffordCart = async (req, res, next) => { 
    const { productId, numberOfProducts } = req.body;

    let product = await findProduct({ id: productId });

    const totalCost = +product.cost * numberOfProducts;

    if (+req.user.deposit >= totalCost) {
        req.product = product;
        next()
    } else {
        return res.status(400).json({
            success: false,
            message: 'You do not have enough coin deposit to complete this transaction'
        });
    }
}

module.exports = canAffordCart;