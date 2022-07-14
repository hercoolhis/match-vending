const connection = require("../loaders/database")


const setUserRepository = async () => {
    const User = await (await connection()).getRepository('user');

    return User;
}

const createUser = async (payload) => {
    const User = await setUserRepository();

    let createdUser = await User.save(payload);

    return createdUser;
}

const updateUser = async (id, updateObject) => {
    const User = await setUserRepository();

    return await User.update({ id }, { ...updateObject });
}

const deleteUser = async (id) => {
    const User = await setUserRepository();

    return await User.delete({ id });
}

const findUser = async (query, includePassword = false) => {
    const User = await setUserRepository();

    const select = ['id', 'username', 'deposit'];

    if (includePassword) {
        select.push('password');
    }

    let requestedUser = await User.findOne({
        select,
        where: {
          ...query
        },
      });

    return requestedUser;
} 

module.exports = {
    createUser,
    findUser,
    deleteUser,
    updateUser
}