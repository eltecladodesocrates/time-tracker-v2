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
    const task = await Task.findByIdAndUpdate(req.body.trackButton, {
        time: 25
    })
    res.redirect('/')
})

module.exports = router