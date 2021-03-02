const mongoose = require('mongoose')

const subTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
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
    }

})

const SubTask = mongoose.model('SubTask', subTaskSchema)

module.exports = SubTask