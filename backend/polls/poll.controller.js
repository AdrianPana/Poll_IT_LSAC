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

    const {title, singleChoice, options} = req.body

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
        singleChoice: singleChoice,
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

    const {votes} = req.body
    
    try {
        const poll = await Poll.findOne({_id: id})
        
        if (poll.voters.includes(req.user._id)) {
            res.status(403).send({message: "User already voted on the poll"})
            return
        }
        
        poll.voters.push(req.user._id)
        for (let i = 0; i < votes.length; ++i) {
            poll.options[votes[i]].votes = poll.options[votes[i]].votes + 1
        }

        poll.save()
        res.status(200).json(poll)
    } catch (err) {
        res.status(500).send({message: err})
    }
}

module.exports = {getPolls, createPoll, deletePoll, updatePoll}