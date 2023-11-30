const express = require('express')
const router = express.Router();

const controller = require('./user.controller')
const auth = require('../auth/auth')

router.get('/', auth, controller.getUser)
router.post('/register', controller.registerUser)
router.post('/login', controller.loginUser)

module.exports = router