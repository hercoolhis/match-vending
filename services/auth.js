const bcrypt = require("bcryptjs");
const logger = require("../loaders/logger");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const { createUser, findUser } = require("../data-access/user");
const { Logform } = require("winston");


module.exports = class AuthService {

    constructor() {        
        this.SignUp = this.SignUp.bind(this);
        this.SignIn = this.SignIn.bind(this);
    }
    
    async SignUp(payload) {
        try {
            //get input  
            const { username, password } = payload;          
            
            //hash password
            logger.info("Hashing Password");
            let hashedPassword = await bcrypt.hash(password, 10);

            //create user ...delegate to data access layer later
            logger.info("Creating User");
            const user = await createUser({
                ...payload,
                deposit: "0",
                password: hashedPassword
            });         

            //generate jwt
            logger.info("Generating token");
            let token = this.generateToken(username);

            //remove password from user object
            Reflect.deleteProperty(user, 'password');

            //return user details and token
            return {
                user,
                token
            }

        } catch ({message}) {
           throw new Error(message);
        }
    }

    async SignIn(payload) {
        
        //get input
        const { username, password } = payload;    
        //find user ...delegate to data access layer later
        let userRecord = await findUser({ username }, true);

        console.log(userRecord);
       
        if (!userRecord) {
            throw new Error('User not registered');
        }
        
        //check password
        let validPassword = await bcrypt.compare(password, userRecord.password);
        if (validPassword) {
            const token = this.generateToken(username);

            Reflect.deleteProperty(userRecord, 'password');

            //return user and token
            return {
                user: userRecord,
                token
            }
        } else {
            throw new Error('invalid Password');
        }        

    }

    generateToken(username) {
        return jwt.sign({ username }, secret, { expiresIn: '1h' });
    }

}