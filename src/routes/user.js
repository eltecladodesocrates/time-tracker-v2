require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')

const router = new express.Router()

router.use(bodyParser.urlencoded({ extended: true }))

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const secret = 'Thisisoursecret'
userSchema.plugin(encrypt, {secret, encryptedFields: ['password']})

const User = new mongoose.model('User', userSchema)

router.get('/login', (req, res) => {
    res.render('login')
}) 

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {

    const user = new User({
        email: req.body.userEmail,
        password: req.body.userPassword
    })
    try {
        await user.save()
        res.redirect('/signup')
    } catch (e){
        res.send(e)
    }

})

module.exports = router