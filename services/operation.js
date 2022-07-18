const { createPurchase, findPurchase } = require("../data-access/purchase");
const UserService = require("./user");


module.exports = class OperationService {

    userService

    constructor() {     
        this.BuyProduct = this.BuyProduct.bind(this);
        //this.userService = new UserService();
    }

    async DepositCoins(payload) {
        try {
            const { user, depositAmount } = payload;
            console.log(+user.deposit, depositAmount);

            const newDeposit  = +user.deposit + +depositAmount;

            const userService = new UserService()

            //get input 
            await userService.UpdateUser({ id: user.id, updateObject: { deposit: `${newDeposit}` }  })               

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

            const userService = new UserService();

            await userService.UpdateUser({ id: user.id, updateObject: { deposit: `${newDeposit}` }  });
            
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
            const userService = new UserService()

            //get input 
            await userService.UpdateUser({ id: user.id, updateObject: { deposit: `0` }  })               

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

            console.log(purchases);


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