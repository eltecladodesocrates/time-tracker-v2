const substracTime = (timeStart, timeEnd) => {

    const hrsStart = parseInt(timeStart.split(':')[0])
    const minStart = parseInt(timeStart.split(':')[1])

    const hrsEnd = parseInt(timeEnd.split(':')[0])
    let minEnd = parseInt(timeEnd.split(':')[1])

    const hrsDifference = hrsEnd - hrsStart
    if (hrsDifference >= 1) {
        minEnd = minEnd + (hrsDifference * 60)
    }

    const passedMin = minEnd - minStart
    const hrs = parseInt(passedMin/60)
    const min = passedMin - (hrs * 60)
    const height = (((hrs * 60) + min) * 40) / 60

    // Startpoint

    const startPoint = ((hrsStart - 4) * 40) + ((minStart * 40) / 60)

    return [hrs, min, height, startPoint]

}

module.exports = substracTime