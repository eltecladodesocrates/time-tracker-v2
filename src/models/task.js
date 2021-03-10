const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    start: {
        type: String,
    },
    end: {
        type: String
    },
    subTasks: {
        type: Array
    },
    date: {
        type: String
    }
    
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task