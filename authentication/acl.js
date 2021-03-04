
'use strict';
const User = require('../models/users');

module.exports = (action) => {
    return async (req, res, next) => {
        try {
            let role = req.user[0].role;
            if (await User.can(role, action)) {
                next();
            } else {
                next('Forbidden');
            }
        } catch (e) {
            next(e);
        }
    };
};