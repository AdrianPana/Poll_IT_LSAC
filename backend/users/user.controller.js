const User = require('./user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const validateRegisterInput = (email, password, confirmPass) => {
    if (password.length < 8 || password.length > 32)
        return "Password should have a length of 8-32 characters"

    if (password != confirmPass)
        return "Passwords don't match"

    const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.]+\.[A-Za-z]+$/
    if (!emailRegex.test(email)) 
        return "Email is invalid"
    
    return true
}

const registerUser = async (req, res) => {

    const {email, password, confirmPassword} = req.body

    const validateInput = validateRegisterInput(email, password, confirmPassword)

    if (validateInput !== true) {
        return res.status(400).send({message: validateInput})
    }

    try {
        const duplicateUser = await User.findOne({email: email}).exec()

        if (duplicateUser != null) {
            return res.status(409).send({message: 'That email address is already in use!'})
        }    
    } catch (err) {
        res.status(500).send({message: err})
    }

    const user = new User({
        email: email,
        password: bcrypt.hashSync(password, 10),
    })
    try {
        await user.save()
        res.status(200).send({message: `User ${email} successfully added to the database`})
    } catch (err) {
        res.status(500).send({message: err});
    }
}

const loginUser = async (req, res) => {
    
    const {email, password} = req.body

    try {
        const foundUser = await User.findOne({email: email}).exec()

        if (foundUser == null) {
            return res.status(404).send({message: `That email address or password you entered is invalid!`})
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
            return res.status(404).send({message: `That email address or password you entered is invalid!`})
        }

        const payload = { id: foundUser._id, email: foundUser.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d' 
        });
    
        res.status(200).send({ message: token })
    } catch (err) {
        res.status(500).send({message: err})
    }
}

const getUser = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user._id).exec()

        if (foundUser == null) {
            return res.status(404).send({message: `Couldn't find user`})
        }

        res.status(200).json(foundUser)

    } catch (err) {
        res.status(500).send({message: err})
    }
}

module.exports = {registerUser, loginUser, getUser}