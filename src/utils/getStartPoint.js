const SubTask = require('../models/subTask')
const moment = require('moment')

const getStartPoint = async (subTaskId) => {

    const subTask = await SubTask.findById(subTaskId)
    const time = moment().format('LT').split(' ')[0]
    const hrs = parseInt(time.split(':')[0]) - 4
    const min = parseInt(time.split(':')[1])

    const startPoint = (hrs * 40) + ((min * 40) / 60)
    subTask.startPoint = startPoint
    await subTask.save()

}

module.exports = getStartPoint