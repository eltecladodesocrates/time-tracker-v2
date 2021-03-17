const SubTask = require('../models/subTask')
const currentTime = require('./currentTime')


const getTimePassed = async (subId) => {

    
    const subTask = await SubTask.findById(subId)
    const date = parseInt((new Date().getTime()) / 1000)
    const start = subTask.timeStart
    const end = date

    totalSec = end - start

    const hrs = parseInt(totalSec/3600)
    const min = parseInt((totalSec - (3600 * hrs))/60)
    const sec = (totalSec - (3600 * hrs) - (60 * min))

    subTask.hrs = hrs
    subTask.min = min
    subTask.sec = sec
    subTask.timeEnd = end
    subTask.height = (((hrs * 60) + min) * 40) / 60
    await subTask.save()

}

// const getHeight = async (subTaskId) => {

//     const subTask = await SubTask.findById(subTaskId)
//     const totalMins = (subTask.hrs * 60) + subTask.min
//     const height = (totalMins * 40) / 60
//     console.log(subTask)
//     console.log(height)
//     subTask.height = (totalMins * 40) / 60
//     await subTask.save()
    
// }

module.exports = getTimePassed