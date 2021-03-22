const getRealTime = () => {

    const date = new Date()
    const utcHrs = (date.getUTCHours()).toString()
    const utcMin = (date.getUTCMinutes()).toString()
    const formatedHrs = utcHrs.length === 1 ? '0' + utcHrs : utcHrs
    const formatedMin = utcMin.length === 1 ? '0' + utcMin : utcMin
    const startPoint = (formatedHrs * 40) + ((formatedMin * 40) / 60)
    return {
        hrsMin: `${formatedHrs}:${formatedMin}`,
        startPoint
    }
    
}

module.exports = getRealTime