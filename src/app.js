const express = require('express')
const bodyParser = require('body-parser')

const taskRouter = require('./routes/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(taskRouter)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})