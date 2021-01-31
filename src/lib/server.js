'use strict'

const express = require('express')
const app = express()
app.use(express.json())
const user = require('../models/users')
const auth = require('../authentication/basic-auth')



app.post('/signup', signUp)

function signUp(req, res) {
    return user.save(req.body)
        .then(data => {
            return user.generateToken(data)
        })
        .then(data => {
            res.status(200).send(data)
        })
}

app.post('/signin', auth, signIn)
function signIn(req, res) {
    console.log('req :', req.me);

    res.status(200).send(req.me)
}


app.get('/showusers', showUsers)
function showUsers(req, res) {
    return user.list()
        .then(data => {
            res.status(200).json(data)
        })
}


















module.exports = {
    server: app,
    start: port => {
        let PORT = 3000
        app.listen(PORT, () => { console.log(`Listening on PORT ${port}`) })
    }
}