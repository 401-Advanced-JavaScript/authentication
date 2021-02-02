'use strict';

const users = require('../models/users');



module.exports = async (req, res, next) => {
    if (!req.headers.authorization) { next('invalid login') }
    let token = req.headers.authorization.split(' ').pop();
    users.authenticateToken(token)
        .then(validUser => {
            req.user = validUser;
            next();
        }).catch(err => next(err));

}

