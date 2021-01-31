'use strict';

const schema = require('./user-schema');
const Model = require('./user-model');

class UserCollection extends Model {
    constructor() {
        super(schema);
    }
}

module.exports = new UserCollection;