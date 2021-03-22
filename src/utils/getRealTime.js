const getRealTime = () => {

    const date = new Date()
    let utcHrs = date.getUTCHours()
    const utcMin = (date.getUTCMinutes()).toString()
    const offsetTime = date.getTimezoneOffset() / 60
    if (utcHrs === 0) {
        utcHrs = 12
    } else if (utcHrs === 1) {
        utcHrs = 13
    } else if (utcHrs === 2) {
        utcHrs = 14
    } else if (utcHrs === 3) {
        utcHrs = 15
    }
    const hrs = (utcHrs - offsetTime).toString()
    const formatedHrs = hrs.length === 1 ? '0' + hrs : hrs
    const formatedMin = utcMin.length === 1 ? '0' + utcMin : utcMin
    const startPoint = (formatedHrs * 40) + ((formatedMin * 40) / 60)
    return {
        hrsMin: `${formatedHrs}:${formatedMin}`,
        startPoint
    }
    
}

module.exports = getRealTime