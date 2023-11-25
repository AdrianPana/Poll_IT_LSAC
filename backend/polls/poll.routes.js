const express = require('express')
const router = express.Router();

const controller = require('./poll.controller')
const auth = require('../auth/auth')

router.get('/', controller.getPolls)
router.post('/', auth, controller.createPoll)
router.delete('/:id', auth, controller.deletePoll)
router.patch('/vote/:id', auth, controller.updatePoll)

module.exports = router