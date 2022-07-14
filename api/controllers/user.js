const AuthService = require("../../services/auth");
const UserService = require("../../services/user");
const { SignUp } = new AuthService();
const { FetchUser, UpdateUser, DeleteUser } = new UserService();


const userSignUp = async (req, res, next) => {
    try {
        let createdUser = await SignUp(req.body);
    
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
}

const fetchUser = async (req, res, next) => {
    try {
        let fetchedUser = await FetchUser(req.params);
    
        res.status(200).json(fetchedUser);
    } catch (error) {
        next(error);
    }
    
}

const updateUser = async (req, res, next) => {
    try {
        const { updateObject } = req.body;
        const { id } = req.params;

        let result = await UpdateUser({ id, updateObject });
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
    
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await DeleteUser({ id });
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
    
}



module.exports = {
    userSignUp,
    fetchUser,
    updateUser,
    deleteUser
}