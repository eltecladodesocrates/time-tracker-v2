const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {

    } catch (e) {
        res.send({ error: 'Please authenticate' })
    }
}

module.exports = auth