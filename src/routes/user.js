const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.use(bodyParser.urlencoded({ extended: true }))

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/login', async (req, res) => {
    res.render('login')
}) 

router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {   
        res.status(400).send()
    }
    
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {

    const user = new User({
        name: req.body.userName,
        password: req.body.userPassword,
        email: req.body.userEmail 
    })
    const token = await user.generateAuthToken()
    await user.save()
    // res.redirect('/')
    res.send({ user, token })
})

module.exports = router