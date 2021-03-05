'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const model = require('./user-collection');
let db = {}
let users = {};
const SECRET = 'NoBodyKnow';
const actions = {
    'admin': ['read', 'create', 'update', 'delete'],
    'editor': ['read', 'update'],
    'writer': ['read', 'create'],
    'user': ['read'],
}

users.save = async function (data) {
    data.password = await bcrypt.hash(data.password, 5)
    await model.create(data)
    db[data.username] = data
    return data
}

users.generateToken = async function (data) {
    let userInfo = {
        username:data.username,
        acl:actions[data.role]
    }
    let token = await jwt.sign(userInfo, SECRET)
    console.log('token :', token);
    return token
}

users.comparePassword = async function (username, pass) {
    let readFromDb = await model.read(username)
    if (readFromDb[0]) {
        let comparePassword = await bcrypt.compare(pass, readFromDb[0].password)
        if (comparePassword) {
            return readFromDb[0]
        } else {
            return 'Compared password has failed'
        }
    } else {
        return Promise.reject()
    }

}
users.authenticateToken = async function (token) {
    let username = jwt.verify(token, SECRET);
    return await model.read(username)
}
users.list = async () => {
    return await model.read()
}

users.can = async function (role, action) {
    if (actions[role].includes(action)) {
        return true;
    } return false;
}




module.exports = users



















