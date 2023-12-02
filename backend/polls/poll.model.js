const mongoose = require('mongoose')
const { ObjectId } = require("mongoose/lib/types");

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
        singleChoice: {
            type: Boolean,
            required: true
        },
        options: {
            type: [{}]
        },
        voters: {
            type: [ObjectId],
        },
    },
    {
        timestamps: true
    }
)

const Poll = mongoose.model('Poll', pollSchema)

module.exports = {Poll}