const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')
const subTaskRouter = require('./routes/subTask')

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs')

app.use(userRouter)
app.use(taskRouter)
app.use(subTaskRouter)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

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




