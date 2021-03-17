const SubTask = require('../models/subTask') 

const getHeight = async (subTaskId) => {

    const subTask = await SubTask.findById(subTaskId)
    const totalMins = (subTask.hrs * 60) + subTask.min
    const height = (totalMins * 40) / 60
    subTask.height = (totalMins * 40) / 60
    await subTask.save()
    
}

module.exports = getHeight