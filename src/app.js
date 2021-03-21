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







