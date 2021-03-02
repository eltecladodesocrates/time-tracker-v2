const express = require('express')
const bodyParser = require('body-parser')
const Task = require('../models/task')
const SubTask = require('../models/subTask')
const router = new express.Router()

router.get('/:taskId', async (req, res) => {

    const id = req.params.taskId
    const task = await Task.findById(id)
    const name = task.name
    const subTasks = await SubTask.find({
        owner: id
    })
    res.render('subTask', {
        name,
        id,
        subTasks
    })
})

router.post('/:taskId', async (req, res) => {

    const id = req.params.taskId
    const subTask = new SubTask({
        name: req.body.newSubtask,
        owner: id
    })
    await subTask.save()
    res.redirect(`/${id}`)
    
})

module.exports = router