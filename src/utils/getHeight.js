const SubTask = require('../models/subTask') 

const getHeight = async (subTaskId) => {

    const subTask = await SubTask.findById(subTaskId)
    const totalMins = (subTask.hrs * 60) + subTask.min
    subTask.height = (totalMins * 40) / 60
    console.log(subTask)
    await subTask.save()
    
}

module.exports = getHeight