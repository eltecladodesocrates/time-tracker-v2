const Task = require('../models/task')
const SubTask = require('../models/subTask')

const sumUpTime = async (taskId, subTaskId) => {
    const task = await Task.findById(taskId)
    const subTask = await SubTask.findById(subTaskId)

    task.sec += subTask.sec
    task.min += subTask.min
    task.hrs += subTask.hrs

    if (task.sec >= 60) {
        task.sec = task.sec - 60
        task.min++
    }

    if (task.min >= 60 ) {
        task.min = task.min - 60
        task.hrs++
    }

    await task.save()
    
}

module.exports = sumUpTime