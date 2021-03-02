const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(taskRouter)
app.use(userRouter)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {

//     const password = 'Red1234!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare(password, hashedPassword)
//     console.log(isMatch)
    
// }

// myFunction()