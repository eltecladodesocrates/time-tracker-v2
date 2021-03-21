const moment = require('moment')

const getStartPoint = () => {

    const time = moment().format('LT').split(' ')[0]
    const hrs = parseInt(time.split(':')[0]) - 4
    const min = parseInt(time.split(':')[1])
    console.log(time)
    const startPoint = (hrs * 40) + ((min * 40) / 60)
    return startPoint

}

module.exports = getStartPoint