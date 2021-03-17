const express = require('express')
const bodyParser = require('body-parser')

const Task = require('../models/task')
const SubTask = require('../models/subTask')
const substracTime = require('../utils/substractTime')

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

router.post('/:taskId/deleteSub', async (req, res) => {
    const id = req.params.taskId
    const subTask = await SubTask.findByIdAndDelete(req.body.deleteCheckbox)
    res.redirect(`/${id}`)
})

router.post('/:taskId', async (req, res) => {

    const id = req.params.taskId
    const hrsMin = substracTime(req.body.startTime, req.body.endTime)

    const task = await Task.findById(id)
    const subTask = new SubTask({
        name: task.name,
        owner: id,
        hrs: hrsMin[0],
        min: hrsMin[1]
    })
    await subTask.save()
    res.redirect(`/${id}`)

})

module.exports = router