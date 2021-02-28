const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/user')
const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/login', (req, res) => {
    res.render('login')
}) 

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    console.log(req.body)
    const user = new User({
        name: req.body.userName,
        password: req.body.userPassword,
        email: req.body.userEmail 
    })
    await user.save()
    res.redirect('/')
})


module.exports = router