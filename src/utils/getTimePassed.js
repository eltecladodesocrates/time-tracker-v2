const getTimePassed = (start, taskHrs, taskMin, taskSec) => {

    const date = parseInt((new Date().getTime()) / 1000)
    const end = date

    totalSec = end - start

    const hrs = parseInt(totalSec/3600)
    const min = parseInt((totalSec - (3600 * hrs))/60)
    const sec = (totalSec - (3600 * hrs) - (60 * min))

    taskHrs += hrs
    taskMin += min
    taskSec += sec

    if (taskSec >= 60) {
        taskSec = taskSec - 60
        taskMin++
    }

    if (taskMin >= 60 ) {
        taskMin = taskMin - 60
        taskHrs++
    }


    const height = (((hrs * 60) + min) * 40) / 60


    const atributes = {
        hrs,
        min,
        sec,
        end,
        height,
        taskHrs,
        taskMin,
        taskSec
    }
    return atributes

}

module.exports = getTimePassed