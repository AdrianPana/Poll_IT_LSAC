const jwt = require('jsonwebtoken')
const User = require('../users/user.model')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(400).send({message: "Missing token"})
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).send({message: "Unauthorized"})
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(500).send({message: e});
    }
}

module.exports = auth