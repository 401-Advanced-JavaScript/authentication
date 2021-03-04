'use strict'

const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['admin', 'editor', 'writer', 'user'] }
})

module.exports = mongoose.model('auth', schema)