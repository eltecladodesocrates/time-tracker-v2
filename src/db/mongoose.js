const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })
mongoose.connect('mongodb+srv://dbRP:13anguloX@cluster0.hray9.mongodb.net/timeTracker', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})