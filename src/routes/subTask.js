const express = require('express')
const bodyParser = require('body-parser')

const SubTask = require('../models/subTask')
const Task = require('../models/task')
const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/:taskId', async (req, res) => {
    const id = req.params.taskId
    const task = await Task.findById(id)
    const subTasks = await SubTask.find()
    const name = task.name
    
    res.render('subTask', {
        id,
        name, 
        subTasks
    })
})

router.post('/:taskId', async (req, res) => {

    const id = req.params.taskId

    res.redirect(`/${id}`)

})

module.exports = router