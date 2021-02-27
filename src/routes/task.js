const express = require('express')
const bodyParser = require('body-parser')
const Task = require('../models/task')
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

    res.render('track', {
        tasks,
        sec,
        id
    })
})

router.post('/stop', async (req, res) => {
    
    const id = req.body.startButton
    task = await Task.findById(id)
    finalSec = task.sec + parseInt(req.body.secPassed)
    finalMin = task.min + parseInt(req.body.minPassed)
    finalHrs = task.hrs + parseInt(req.body.hrsPassed)
    
    await Task.findByIdAndUpdate(id, {
        sec: finalSec,
        min: finalMin,
        hrs: finalHrs
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