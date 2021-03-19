const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the string password')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    }
})

userSchema.plugin(passportLocalMongoose)

// userSchema.statics.findByCredentials = async (email, password) => {

//     const user = await User.findOne({ email })
//     if (!user) {
//         throw new Error('Unable to login')
//     }
//     const isMatch = await bcrypt.compare(password, user.password)
//     if(!isMatch) {
//         throw new Error('Unable to login')
//     }
//     return user

// }

// Hash plane text password
// userSchema.pre('save', async function (next) {
//     const user = this
//     user.password = await bcrypt.hash(user.password, 8)
//     next()
// })

const User = mongoose.model('User', userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



module.exports = User