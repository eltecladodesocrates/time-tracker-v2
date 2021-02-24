const express = require('express')
const bodyParser = require('body-parser')

const Task = require('./models/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', async (req, res) => {

    const tasks = await Task.find()
    console.log(tasks);
    
    res.render('tasks', {
        tasks
    })
})

app.post('/', async (req, res) => {

    const task = new Task({
        name: req.body.newTask
    })
    await task.save()
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})