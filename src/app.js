const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')
const subTaskRouter = require('./routes/subTask')

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(userRouter)
app.use(taskRouter)
app.use(subTaskRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})


const substracTime = () => {
    const timeStart = '13:30'
    const timeEnd = '15:10'

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

    return [hrs, min]
}
// const moment = require('moment')

// const getStartPoint =  () => {

//     // const subTask = await SubTask.findById(subTaskId)
//     const time = moment().format('LT').split(' ')[0]
//     const hrs = parseInt(time.split(':')[0]) - 4
//     const min = parseInt(time.split(':')[1])

//     const startPoint = (hrs * 40) + ((min * 40) / 60)
//     // subTask.startPoint = startPoint
//     // await subTask.save()
//     console.log(startPoint)
//     return startPoint
    
// }

// getStartPoint()




