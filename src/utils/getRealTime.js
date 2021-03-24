const getRealTime = () => {

    const date = new Date()
    const utcHrs = (date.getUTCHours())
    const utcMin = (date.getUTCMinutes()).toString()
    let hrs = utcHrs - 4
    if (utcHrs === 0) {
        hrs = 20
    } else if (utcHrs === 1) {
        hrs = 21
    } else if (utcHrs === 2) {
        hrs = 22
    } else if (utcHrs === 3) {
        hrs = 23
    }
    hrs = hrs.toString()
    const formatedHrs = hrs.length === 1 ? '0' + hrs : hrs
    const formatedMin = utcMin.length === 1 ? '0' + utcMin : utcMin
    const startPoint = (formatedHrs * 40) + ((formatedMin * 40) / 60)
    return {
        hrsMin: `${formatedHrs}:${formatedMin}`,
        startPoint
    }
    
}

module.exports = getRealTime