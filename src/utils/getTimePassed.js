const SubTask = require('../models/subTask')
const currentTime = require('./currentTime')

const getTimePassed = async (subId) => {

    const subTask = await SubTask.findById(subId)
    const start = subTask.timeStart
    const end = currentTime()

    const hrsStart = parseInt(start.split(':')[0])
    const minStart = parseInt(start.split(':')[1])
    const secStart = parseInt(start.split(':')[2])

    const hrsEnd = parseInt(end.split(':')[0])
    const minEnd = parseInt(end.split(':')[1])
    const secEnd = parseInt(end.split(':')[2])

    subTask.hrs = hrsEnd - hrsStart
    subTask.min = minEnd - minStart
    subTask.sec = secEnd - secStart
    subTask.timeEnd = end
    await subTask.save()

    console.log(subTask)
}

module.exports = getTimePassed