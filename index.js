'use strict'

const server = require('./lib/server')
const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
server.start(process.env.PORT)

