const getRealTime = () => {

    const date = new Date()
    const utcHrs = date.getUTCHours()
    const utcMin = (date.getUTCMinutes()).toString()
    const offsetTime = date.getTimezoneOffset() / 60
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