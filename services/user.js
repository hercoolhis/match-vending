const logger = require("../loaders/logger");
const { createUser, findUser, updateUser, deleteUser } = require("../data-access/user");


module.exports = class UserService {

    constructor() {        
        this.FetchUser = this.FetchUser.bind(this);
    }
    
    async FetchUser(payload) {
        try {
            const { id } = payload;

            logger.info("Fetching User");
            let user = await findUser({ id });

            if (!user) {
                const error = new Error('User not found');
                error['status'] = 404;
                throw error;
            }

            //return user details
            return {
                user
            }

        } catch ({message, status}) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

    async UpdateUser(payload) {
        try {
            const { id, updateObject } = payload;

            logger.info("Updating User");
            let user = await findUser({ id });

            if (!user) {
                const error = new Error('User not found');
                error['status'] = 404;
                throw error;
            }

            await updateUser(id, updateObject)

            return {
                success: true
            }

        } catch ({message, status}) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

    async DeleteUser(payload) {
        try {
            const { id } = payload;

            logger.info("Deleting User");
            let user = await findUser({ id });

            if (!user) {
                const error = new Error('User not found');
                throw error;
            }

            await deleteUser(id)

            return {
                success: true
            }

        } catch ({message, status}) {
            const error = new Error(message);
            error['status'] = status;
            throw error;
        }
    }

}