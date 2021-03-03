const moment = require('moment')

const currentTime = () => {

    const currentHourMinute = moment().format('LT')
    const hourMinuteList = currentHourMinute.split(' ')
    if (!hourMinuteList[1].toLowerCase() === 'am') {
        let hour = parseInt(hourMinuteList[0].split(':')[0]) + 12
        const minute = hourMinuteList[0].split(':')[1]
        return hour.toString() + ':' + minute
        
    }
    return hourMinuteList[0]

}

module.exports = currentTime