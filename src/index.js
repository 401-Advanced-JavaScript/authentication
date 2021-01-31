'use strict'

const server = require('./lib/server')
const mongoose = require('mongoose')
const URI = 'mongodb+srv://Mohammed:123456Jj@cluster0.alumx.mongodb.net/clusterzz?retryWrites=true&w=majority'
const URI2 = 'mongodb://localhost:27017/authey'


mongoose.connect(URI2, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
server.start(3000)

