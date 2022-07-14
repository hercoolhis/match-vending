const { findProduct } = require("../../data-access/product");

const onlySeller = async (req, res, next) => { 
    const methodsToCheckSeller = ['PUT', 'DELETE'];

    if (req.user) {
        if (req.user.role === "SELLER") {
            
            if (methodsToCheckSeller.includes(req.method)) {
                let product = await findProduct({ id: req.params.id }, true);

                if (product.seller.id === req.user.id) {
                    next();
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'You are not authorised to perform this operation'
                    });
                }
            } else {
                next();
            }
            
        } else {
            return res.status(401).json({
                success: false,
                message: 'You are not authorised to perform this operation'
            });
        }
    }
}

module.exports = onlySeller;