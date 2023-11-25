const mongoose = require('mongoose')
const { ObjectId } = require("mongoose/lib/types");

const pollOptionSchema = mongoose.Schema(
    {
        option: {
            type: String,
            required: true
        },
        votes: {
            type: Number,
            default: 0
        }
    }
)

const pollSchema = mongoose.Schema(
    {
        owner: {
            type: ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        options: {
            type: [pollOptionSchema]
        },
        voters: {
            type: [ObjectId],
        }
    },
    {
        timestamps: true
    }
)

const PollOption = mongoose.model('PollOption', pollOptionSchema)
const Poll = mongoose.model('Poll', pollSchema)

module.exports = {Poll, PollOption}