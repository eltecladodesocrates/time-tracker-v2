const moment = require('moment')

const currentTime = () => {

    const currentHourMinute = moment().format('LT')
    const hourMinuteList = currentHourMinute.split(' ')
    let hour = parseInt(hourMinuteList[0].split(':')[0]) -4
    const minute = hourMinuteList[0].split(':')[1]
    
    if(hourMinuteList[1] === 'AM' && hour == 12) {
        hour = hour - 12
        return hour.toString() + ':' + minute
    }

    if(hourMinuteList[1] === 'AM' && hour !== 12) {
        return hour.toString() + ':' + minute
    } else {
        hour = hour + 12
        return hour.toString() + ':' + minute
    }

}

module.exports = currentTime