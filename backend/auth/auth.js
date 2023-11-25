const jwt = require('jsonwebtoken')
const User = require('../users/user.model')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(400).send({message: "Missing token"})
            return 
        }

        const { id } = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(id);

        if (!user) {
            res.status(400).send({message: "Unauthorized"})
            return 
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = auth