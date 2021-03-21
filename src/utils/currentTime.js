const moment = require('moment')

const currentTime = () => {

    const currentHourMinute = moment().format('LTS')
    const hourMinuteList = currentHourMinute.split(' ')
    let hour = parseInt(hourMinuteList[0].split(':')[0])
    const minute = hourMinuteList[0].split(':')[1]
    const second =  hourMinuteList[0].split(':')[2]
    
    if(hourMinuteList[1] === 'AM' && hour == 12) {
        hour = hour - 12
        return hour.toString() + ':' + minute + ':' + second
    }

    if(hourMinuteList[1] === 'AM' && hour !== 12) {
        return hour.toString() + ':' + minute + ':' + second
    } else {
        hour = hour + 12
        return hour.toString() + ':' + minute + ':' + second
    }

}

module.exports = currentTime