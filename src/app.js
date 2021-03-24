const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')
const subTaskRouter = require('./routes/subTask')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(userRouter)
app.use(taskRouter)
app.use(subTaskRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// const convertTimeStamp = require('./utils/convertTimeStamp')
// const unix = parseInt((new Date().getTime()) / 1000)

// console.log(convertTimeStamp(unix))
// const offset = date.getTimezoneOffset()
// console.log(offset)



// const getRealTime = () => {

//     const date = new Date()
//     const utcHrs = date.getUTCHours()
//     const utcMin = (date.getUTCMinutes()).toString()
//     const offsetTime = date.getTimezoneOffset() / 60
//     const hrs = (utcHrs - offsetTime).toString()
//     const formatedHrs = hrs.length === 1 ? '0' + hrs : hrs
//     const formatedMin = utcMin.length === 1 ? '0' + utcMin : utcMin
//     console.log();
    
//     return `${formatedHrs}:${formatedMin}`
    
// }

// getRealTime()

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
    console.log('From real time')
    console.log(utcHrs);
    
    // return {
    //     hrsMin: `${formatedHrs}:${formatedMin}`,
    //     startPoint
    // }
    
}

// getRealTime()







