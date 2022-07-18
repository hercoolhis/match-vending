const connection = require("../loaders/database")


const setPurchaseRepository = async () => {
    const Purchase = await (await connection()).getRepository('purchase');

    return Purchase;
}

const createPurchase = async (payload) => {
    const Purchase = await setPurchaseRepository();

    let createdPurchase = await Purchase.save(payload);

    return createdPurchase;
}
                                                                                                                                                                                           
const updatePurchase = async (id, updateObject) => {
    const purchase = await setPurchaseRepository();

    return await purchase.update({ id }, { ...updateObject });
}

const deletePurchase = async (id) => {
    const purchase = await setPurchaseRepository();

    return await purchase.delete({ id });
}

const findPurchase = async (query) => {
    const purchase = await setPurchaseRepository();

    let requestedPurchase = await purchase.find({
        ...query,
        relations: {
            //buyer: true
        }
      }, {
      });

    return requestedPurchase;
} 

module.exports = {
    createPurchase,
    findPurchase,
    deletePurchase,
    updatePurchase
}