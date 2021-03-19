const express = require('express')
const bodyParser = require('body-parser')

const router = new express.Router()

// auth packs
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const User = require('../models/user')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())

router.get('/users', async (req, res) => {
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

    // try {
    //     const user = await User.findByCredentials(req.body.email, req.body.password)
    //     res.send({ user })
    // } catch (e) {   
    //     res.status(400).send()
    // }
    
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/auth', (req, res) => {
    if(req.isAuthenticated()) {
        res.send('Yay')
    } else {
        res.redirect('/login')
    }
})

router.post('/signup', async (req, res) => {

    await User.register({ username: req.body.userEmail }, req.body.userPassword, (err, user) => {
        if (err) {
            console.log(err)
            res.redirect('/signup')
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/auth')
            })
        }
    })

    // const user = new User({
    //     name: req.body.userName,
    //     password: req.body.userPassword,
    //     email: req.body.userEmail 
    // })
    // await user.save()
    // // res.redirect('/')
    // res.send({ user })


})

module.exports = router