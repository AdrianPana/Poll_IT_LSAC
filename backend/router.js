const express = require('express')
const router = express.Router()

const userRouter = require('./users/user.routes')
const pollRouter = require('./polls/poll.routes')

router.use('/users', userRouter)
router.use('/polls', pollRouter)


module.exports = router