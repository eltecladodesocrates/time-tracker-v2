const express = require('express')
const bodyParser = require('body-parser')

const auth = require('../middleware/auth')
const User = require('../models/user')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))


router.get('/login', auth, (req, res) => {
    res.render('login')
}) 

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {

    const user = new User({
        name: req.body.userName,
        email: req.body.userEmail,
        password: req.body.userPassword
    })
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.send(e)
    }

})

router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/logout', async (req, res) => {

})

module.exports = router