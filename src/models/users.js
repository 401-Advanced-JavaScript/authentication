'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const model = require('./user-collection');
let db = {}
let users = {};
const SECRET = 'NoBodyKnow';


users.save = async function (data) {
    if (!db[data.username]) {
        data.password = await bcrypt.hash(data.password, 5)
        await model.create(data)
        db[data.username] = data
        return data
    } else {
        console.log('username is taken')
        return Promise.reject()
    }
}

users.generateToken = async function (data) {
    let token = await jwt.sign(data.username, SECRET)
    return token
}

users.comparePassword = async function (username, pass) {
    let readFromDb = await model.read(username)
    if (readFromDb[0]) {
        let comparePassword = await bcrypt.compare(pass, readFromDb[0].password)
        console.log('comparePassword :', comparePassword);
        if (comparePassword) {
            return readFromDb[0]
        } else {
            return 'Compared password has failed'
        }
    } else {
        return Promise.reject()
    }

}
users.list = async () => {
    return await model.read()
}


module.exports = users



















