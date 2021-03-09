const SubTask = require('../models/subTask')

const getStartPoint = async (subTaskId) => {

    const subTask = await SubTask.findById(subTaskId)
    const startHour = parseInt(subTask.timeStart.split(':')[0])
    const startMin = parseInt(subTask.timeStart.split(':')[1])
    const startPoint = (startHour * 40) + ((startMin * 40) / 60)
    subTask.startPoint = startPoint
    await subTask.save()

}

module.exports = getStartPoint