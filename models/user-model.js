'use strict'

class Model {
    constructor(schema) {
        this.schema = schema;
    }
    read(username) {
        if (username) {
            let found = this.schema.find({ username })
            return found
        } else {
            let found = this.schema.find({})
            return found
        }
    }
    create(value) {
        let newValue = new this.schema(value);
        return newValue.save();
    }
    update(_id, value) {
        return this.schema.findByIdAndUpdate(_id, value, { new: true });
    }
    delete(_id) {
        return this.schema.findOneAndDelete(_id);
    }
}
module.exports = Model;