'use strict'

const base64 = require('base-64');
const users = require('../models/users')

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        next('Get Out Of Here !');
    }
    let info = req.headers.authorization.split(' ').pop();

    let [user, password] = base64.decode(info).split(':');

    users.comparePassword(user, password)

        .then(data => {
            console.log('data :', data);
            return users.generateToken(data)
        })
        .then(data => {
            req.me = data
            next()
        })
}