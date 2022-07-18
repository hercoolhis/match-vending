const { createPurchase, findPurchase } = require("../data-access/purchase");
const UserService = require("./user");
const ProductService = require("./product");


module.exports = class OperationService {

    userService
    productService;

    constructor() {     
        this.BuyProduct = this.BuyProduct.bind(this);
        this.DepositCoins = this.DepositCoins.bind(this);
        this.ResetDeposit = this.ResetDeposit.bind(this);
        this.productService = new ProductService();
        this.userService = new UserService();
    }

    async DepositCoins(payload) {
        try {
            const { user, depositAmount } = payload;

            const newDeposit  = +user.deposit + +depositAmount;

            //get input 
            await this.userService.UpdateUser({ id: user.id, updateObject: { deposit: `${newDeposit}` }  })               

            return {
                success: true
            }

        } catch ({ message, status }) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

    async BuyProduct(payload) {
        try {
            const { numberOfProducts, product, user } = payload;

            const totalCost = +product.cost * numberOfProducts;

            const newDeposit  = +user.deposit - +totalCost;

            await this.userService.UpdateUser({ id: user.id, updateObject: { deposit: `${newDeposit}` }  });

            await this.productService.UpdateProduct({ id: product.id, updateObject: { amountAvailable: product.amountAvailable - 1 } });
            
            // create purchase
            await createPurchase({
                totalCost,
                numberOfProducts,
                buyer: user,
                product
            });

            let userPurchaseData = await this.fetchUserPurchases(user.id);

            return {
                success: true,
                ...userPurchaseData,
                amountLeft: newDeposit
            }

        } catch ({ message, status }) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

    async ResetDeposit(payload) {
        try {
            const { user } = payload;

            //get input 
            await this.userService.UpdateUser({ id: user.id, updateObject: { deposit: `0` }  })               

            return {
                success: true
            }

        } catch ({ message, status }) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

    async fetchUserPurchases(userId) {
        try {
            const purchases = await findPurchase({ buyer: userId });

            let totalCoinsSpent = 0;

            for (const each of purchases) {
                totalCoinsSpent += +each.totalCost;
            }

            return {
                purchases,
                totalCoinsSpent
            }

        } catch ({ message, status }) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }


}