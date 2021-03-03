const express = require('express')
const bodyParser = require('body-parser')

const Task = require('../models/task')
const SubTask = require('../models/subTask')
const currentTime = require('../utils/currentTime')
const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', async (req, res) => {

    const tasks = await Task.find()
    
    res.render('tasks', {
        tasks
    })
})



router.post('/', async (req, res) => {

    const task = new Task({
        name: req.body.newTask
    })
    await task.save()
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.body.deleteCheckbox)
    res.redirect('/')
})

router.post('/track', async (req, res) => {

    const id = req.body.startButton
    const tasks = await Task.find()
    const task = await Task.findById(id)
    const sec = task.sec

    const subTask = new SubTask({
        owner: id
    })
    await subTask.save()
    console.log()

    res.render('track', {
        tasks,
        sec,
        id,
        subTaskId: subTask._id
    })
})

router.post('/stop', async (req, res) => {
    
    // const id = req.body.startButton
    const ids = req.body.startButton.split(',')
    const id = ids[0]
    const subId = ids[1]
    const subTask = await SubTask.find({
        _id: subId,
        owner: id
    })

    let sec = req.body.secPassed
    let min = req.body.minPassed
    let hrs = req.body.hrsPassed

    if (sec >= 60) {
        sec = sec - 60
        min++
    }

    if (min >= 60 ) {
        min = min - 60
        hrs++
    }


    await SubTask.findByIdAndUpdate(subId, {
        sec,
        min,
        hrs
    })

    res.redirect('/')
})

router.post('/edit', async (req, res) => {
    const id = req.body.editButton
    const tasks = await Task.find()
    res.render('edit', {
        tasks,
        id
    })
})

router.post('/patch', async (req, res) => {
    const id = req.body.editButton
    const task = await Task.findByIdAndUpdate(id, {
        name: req.body.editInput
    })
    res.redirect('/')
})

module.exports = router