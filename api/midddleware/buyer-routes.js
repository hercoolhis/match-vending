
const onlyBuyer = async (req, res, next) => { 

    if (req.user) {
        if (req.user.role === "BUYER") {
            
           next()
            
        } else {
            return res.status(401).json({
                success: false,
                message: 'You are not authorised to perform this operation'
            });
        }
    }
}

module.exports = onlyBuyer;