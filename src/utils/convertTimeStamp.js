const convertTimeStamp = (unix) => {
    const date = new Date(unix * 1000)
    const hrs = date.getHours()
    const min = date.getMinutes()
    
    return `${hrs}:${min}`
}

module.exports = convertTimeStamp