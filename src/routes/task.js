const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const Task = require('../models/task')
const SubTask = require('../models/subTask')
const User = require('../models/user')

const getTimePassed = require('../utils/getTimePassed')
const getRealTime = require('../utils/getRealTime')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

const trackHours = [0, 1, 2, 3, 4, 5, 6 ,7 ,8 ,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

router.get('/tracks', async (req, res) => {

    try {

        const dayBefore = moment().subtract(2, 'days').format('dddd Do')
        const yesterday = moment().subtract(1, 'days').format('dddd Do')
        const today = moment().format('dddd Do')
        const tomorrow = moment().add(1, 'days').format('dddd Do')
        const dayAfter = moment().add(2, 'days').format('dddd Do')   
        
        const subTasksDayBefore = await SubTask.find({ date: dayBefore })
        const subTasksYesterday = await SubTask.find({ date: yesterday })
        const subTasks = await SubTask.find({ date: today })
        const subTasksTomorrow = await SubTask.find({ date: tomorrow })
        const subTasksDayAfter = await SubTask.find({ date: dayAfter })
        
        res.render('tracks', {
            trackHours,
            subTasks,
            dayBefore,
            yesterday,
            today,
            tomorrow,
            dayAfter,
            subTasksDayBefore,
            subTasksYesterday,
            subTasksTomorrow,
            subTasksDayAfter
        })
    } catch (e) {
        res.send(e)
    }
})

router.get('/', async (req, res) => {

    try {
        const tasks = await Task.find()
        res.render('tasks', {
            tasks
        })
    } catch (e){
        res.send(e)
    }
})



router.post('/', async (req, res) => {

    try {
        const task = new Task({
            name: req.body.newTask,
            color: "lightblue"
        })
        await task.save()
        res.redirect('/')
    } catch (e) {
        res.send(e)
    }

})

router.post('/delete', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.body.deleteCheckbox)
        await SubTask.deleteMany({
            owner: task.id
        })
        res.redirect('/')
    } catch (e) {
        res.send(e)
    }
})

router.post('/track', async (req, res) => {

    const id = req.body.startButton
    const unixTime = parseInt((new Date().getTime()) / 1000)
    const realTime = getRealTime()
    const hrsStart = realTime.hrsMin

    try {
        const tasks = await Task.find()
        const task = await Task.findById(id)
        const sec = task.sec
    
        const subTask = new SubTask({
            name: task.name,
            owner: id,
            timeStart: unixTime,
            hrsStart,
            date: moment().format('dddd Do'),
            color: task.color,
            startPoint: realTime.startPoint
        })
        await subTask.save()
    
        res.render('track', {
            tasks,
            sec,
            id,
            subTaskId: subTask._id
        })
        res.send(task)
    } catch (e) {
        res.send(e)
    }
    

})

router.post('/stop', async (req, res) => {
    
    const ids = req.body.startButton.split(',')
    const id = ids[0]
    const subId = ids[1]
    const subTask = await SubTask.findById(subId)
    const task = await Task.findById(id)

    const realTime = getRealTime()
    const hrsEnd = realTime.hrsMin

    const attributes = getTimePassed(subTask.timeStart, task.hrs, task.min, task.sec)
    subTask.hrs = attributes.hrs
    subTask.min = attributes.min
    subTask.sec = attributes.sec
    subTask.timeEnd = attributes.end
    subTask.hrsEnd = hrsEnd
    subTask.height = (((attributes.hrs * 60) + attributes.min) * 40) / 60
    await subTask.save()

    task.hrs = attributes.taskHrs
    task.min = attributes.taskMin
    task.sec = attributes.taskSec
    await task.save()

    res.redirect('/')
})

router.post('/edit', async (req, res) => {

    try {
        const id = req.body.editButton
        const tasks = await Task.find()
        res.render('edit', {
            tasks,
            id
        })
    } catch (e) {
        res.send(e)
    }
})

router.post('/patch', async (req, res) => {

    try {
        const id = req.body.editButton
        const task = await Task.findByIdAndUpdate(id, {
            name: req.body.editInput
        })
        res.redirect('/')
    } catch (e) {
        res.send(e)
    }
})

module.exports = router