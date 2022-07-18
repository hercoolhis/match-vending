
const validDepositAmount = async (req, res, next) => { 
    const validDepositAmount = ["5", "10", "20", "50", "100"];

    if (req.body.depositAmount) {
        if (validDepositAmount.includes(req.body.depositAmount)) {
            
           next()
            
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid deposit amount'
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'bad request'
        });
    }
}

module.exports = validDepositAmount;