const mongoose = require('mongoose')

const subTaskSchema = new mongoose.Schema({
    name: {
        type: String,
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
    timeStart: {
        type: String
    },
    timeEnd: {
        type: String
    },
    hrsStart: {
        type: String
    },
    hrsEnd: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    height: {
        type: Number,
        default: 0
    },
    startPoint: {
        type: Number,
        default: 0
    },
    date: {
        type: String
    },
    color: {
        type: String
    }
})

const SubTask = mongoose.model('SubTask', subTaskSchema)

module.exports = SubTask