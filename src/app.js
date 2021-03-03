const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')
const subTaskRouter = require('./routes/subTask')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(userRouter)
app.use(taskRouter)
app.use(subTaskRouter)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

const Task = require('./models/task')
const SubTask = require('./models/subTask')

const sumUp = async () => {
    const task = await Task.findById('603f5a1c2ace3116e73cedea')
    const subTask = await SubTask.findById('603fa3a6b837de1fd0827a60')

    task.sec += subTask.sec
    task.min += subTask.min
    task.hrs += subTask.hrs

    if (task.sec >= 60) {
        task.sec = task.sec - 60
        task.min++
    }

    if (task.min >= 60 ) {
        task.min = task.min - 60
        task.hrs++
    }

    
    await task.save()
    
}


