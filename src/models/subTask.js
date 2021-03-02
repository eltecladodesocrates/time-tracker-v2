const mongoose = require('mongoose')

const subTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sec: {
        type: Number,
        default: 0
    },
    min: {
        type: Number,
        default: 0
    },
    hrs: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const SubTask = mongoose.model('SubTask', subTaskSchema)

module.exports = SubTask