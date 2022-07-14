const connection = require("../loaders/database")


const setProductRepository = async () => {
    const Product = await (await connection()).getRepository('product');

    return Product;
}

const createProduct = async (payload) => {
    const Product = await setProductRepository();

    let createdProduct = await Product.save(payload);

    return createdProduct;
}

const updateProduct = async (id, updateObject) => {
    const Product = await setProductRepository();

    return await Product.update({ id }, { ...updateObject });
}

const deleteProduct = async (id) => {
    const Product = await setProductRepository();

    return await Product.delete({ id });
}

const findProduct = async (query) => {
    const Product = await setProductRepository();

    const select = ['id', 'amountAvailable', 'cost', "productName"];

    let requestedProduct = await Product.findOne({
        select,
        where: {
          ...query
        },
      });

    return requestedProduct;
} 

module.exports = {
    createProduct,
    findProduct,
    deleteProduct,
    updateProduct
}