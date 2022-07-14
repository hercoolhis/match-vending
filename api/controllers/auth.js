const AuthService = require("../../services/auth");
const { SignIn } = new AuthService();

const userSignIn =  async (req, res) => {
    let signedInUser = await SignIn(req.body);

    res.status(200).json(signedInUser);
}

module.exports = {
    userSignIn,
}