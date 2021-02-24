const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        default: 0
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task