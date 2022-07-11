
const userSignUp = async (req, res) => {
    
    //let createdUser = await SignUp(req.body);
    
    res.status(201).json({ message: "This is the sign up" });
}

module.exports = {
    userSignUp,
}