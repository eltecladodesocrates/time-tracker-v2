const express = require('express')
const bodyParser = require('body-parser')

const Task = require('../models/task')
const SubTask = require('../models/subTask')

const currentTime = require('../utils/currentTime')
const sumUpTime = require('../utils/sumUpTime')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

const trackHours = [0, 1, 2, 3, 4, 5, 6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

router.get('/tracks', (req, res) => {
    res.render('tracks', {
        trackHours
    })
})

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
    await SubTask.deleteMany({
        owner: task.id
    })
    res.redirect('/')
})

router.post('/track', async (req, res) => {

    const id = req.body.startButton
    const tasks = await Task.find()
    const task = await Task.findById(id)
    const sec = task.sec

    const subTask = new SubTask({
        owner: id,
        timeStart: currentTime()
    })
    await subTask.save()

    res.render('track', {
        tasks,
        sec,
        id,
        subTaskId: subTask._id
    })
})

router.post('/stop', async (req, res) => {
    
    const ids = req.body.startButton.split(',')
    const id = ids[0]
    const subId = ids[1]

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
        hrs,
        timeEnd: currentTime()
    })

    sumUpTime(id, subId)

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