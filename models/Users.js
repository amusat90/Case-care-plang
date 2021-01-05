const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _ = require('lodash');

/** Create User Schema */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    needsPasswordChange: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    loginAttempts: {
        type: Number,
        default: 0
    }
});

UserSchema.methods.retrieve = function() {
    return _.omit(this.toObject(), ['password', '__v']);
}

module.exports = User = mongoose.model('users', UserSchema);