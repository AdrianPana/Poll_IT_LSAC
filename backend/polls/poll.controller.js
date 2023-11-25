const {Poll, PollOption} = require('./poll.model')

const getPolls = async (req, res) => {

    try {
        const polls = await Poll.find({})
        res.status(200).send(polls)
    } catch (err) {
        res.status(500).send(err)
    }
}

const createPoll = async (req, res) => {

    const {title, options} = req.body

    if (title == "Rares" && options.length != 7) {
        res.status(403).send({message: "Invalid poll: Stii si tu cate field-uri are poll-ul asta"})
        return
    }

    if (title == "Codrut") {
        options.push("Tururu")
    }

    const poll = new Poll({
        owner: req.user._id,
        title: title,
        options: options.map(x => new PollOption({option: x}))
    })

    try {
        await poll.save()
        res.status(200).send({message: `Poll was successfully added to the database`})
    } catch (err) {
        res.status(500).send({message: err});
    }
}

const deletePoll = async (req, res) => {
    const {id} = req.params

    try {
        const poll = await Poll.findOne({_id: id})
        if (poll.owner.equals(req.user._id)) {
            await Poll.deleteOne({_id: id})
            res.status(200).send({message: `Poll ${id} removed from the database`})
        }
        else {
            res.status(403).send({message: "Cannot delete poll: Operation unauthorized"})
        }
    } catch (err) {
        res.status(500).send({message: err})
    }
}

const updatePoll = async (req, res) => {
    const {id} = req.params

    const {vote} = req.body

    try {
        const poll = await Poll.findOne({_id: id})

        if (poll.voters.includes(req.user._id)) {
            res.status(403).send({message: "User already voted on the poll"})
            return
        }

        if (vote < 0 || vote >= poll.options.length) {
            res.status(400).send({message: "Invalid vote"})
            return
        }

        poll.voters.push(req.user._id)
        poll.options[vote].votes = poll.options[vote].votes + 1

        poll.save()
        res.status(200).json(poll)
    } catch (err) {
        res.status(500).send({message: err})
    }
}

module.exports = {getPolls, createPoll, deletePoll, updatePoll}