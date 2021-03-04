'use strict'

const express = require('express')
const app = express()
app.use(express.json())
const user = require('../models/users')
const auth = require('../authentication/basic-auth')
const oAuth = require('../authentication/oAuth')
const bearer = require('../authentication/bearer')
const acl = require('../authentication/acl')

app.engine('html', require('ejs').renderFile);
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
    res.status(200).send(req.me)
}

app.get('/oauth', oAuth, (req, res) => {
    res.status(200).send(req.user)
})

app.get('/user', bearer, (req, res) => {
    console.log('req.user :', req.user);
    res.status(200).json(req.user);
});

app.get('/profile', bearer, (req, res) => {
    res.render('../views/dashboard.html')
});


app.get('/read', bearer, acl('read'), (req, res) => {
    try {
        res.status(200).json({ message: 'Route /read worked', user: req.user })
    } catch (e) {
        res.status(403).json('Forbidden: Invalid credentials');
    }
})
app.post('/add', bearer, acl('create'), (req, res) => {
    try {
        res.status(200).json({ message: 'Route /add worked', user: req.user })
    } catch (e) {
        res.status(403).json('Forbidden: Invalid credentials');
    }
})
app.put('/change', bearer, acl('update'), (req, res) => {
    try {
        res.status(200).json({ message: 'Route /change worked', user: req.user })
    } catch (e) {
        res.status(403).json('Forbidden: Invalid credentials');
    }
})
app.delete('/remove', bearer, acl('delete'), (req, res) => {
    try {
        res.status(200).json({ message: 'Route /delete worked', user: req.user })
    } catch (e) {
        res.status(403).json('Forbidden: Invalid credentials');
    }
})


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
        let PORT = process.env.PORT || 3000
        app.listen(PORT, () => { console.log(`Listening on PORT ${port}`) })
    }
}