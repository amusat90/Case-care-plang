const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../models/Users');
const {MESSAGES} = require('../constants/strings');
const {maxLoginAttempts} = require('../config/auth');
const {hashPassword} = require('../utils/hash-system');
const {SERVER_STATUS} = require('../constants/server-status');

const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register');

const _ = require('lodash');

const register = async (req, res) => {
    let errors = validateRegisterInput(req.body);
    const {name, email, password} = req.body;

    if (!_.isEmpty(errors)) {
        return res.status(SERVER_STATUS.BAD_REQUEST).json(errors)
    }

    if (await User.findOne({email})) {
        errors.push(MESSAGES.EMAIL_EXISTING);
        return res.status(SERVER_STATUS.BAD_REQUEST).json(errors);
    }

    const user = new User({name, email, password});
    const securedUser = await hashPassword(user);

    if (securedUser) {
        return res.status(SERVER_STATUS.OK).json(securedUser.retrieve());
    } else {
        return res.status(SERVER_STATUS.SERVER_ERROR).json(MESSAGES.DATABASE_CONNECTION_ERROR);
    }
}

const login = async (req, res) => {
    let errors = validateLoginInput(req.body);
    const {email, password} = req.body;

    if (!_.isEmpty(errors)) {
        return res.status(SERVER_STATUS.BAD_REQUEST).json(errors)
    }

    const user = await User.findOne({email});

    if (!user) {
        errors.push(MESSAGES.USER_NOT_FOUND);
        return res.status(SERVER_STATUS.NOT_FOUND_ERR).json(errors);
    }

    if (user.loginAttempts > maxLoginAttempts) {
        errors.push(MESSAGES.USER_LOCKED);
        return res.status(SERVER_STATUS.FORBIDDEN).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        /** User match & Create JWT Payload*/
        const payload = {
            id: user.id,
            name: user.name
        }

        /** Sign token */
        jwt.sign(payload, keys.appSecret, {expiresIn: keys.expireIn}, (err, token) => {
            user.loginAttempts = 0;
            user.save();
            return res.status(SERVER_STATUS.OK).json({success: true, token: 'Bearer ' + token})
        });
    } else {
        user.loginAttempts = user.loginAttempts + 1;
        errors.push(MESSAGES.PASSWORD_IS_INCORRECT);
        return res.status(SERVER_STATUS.BAD_REQUEST).json(errors);
    }
}

const list = async (req, res) => {
    const query = User.find({}).select(['-password', '-__v']);
    query.exec(function (err, result) {
        if (err) return res.status(SERVER_STATUS.SERVER_ERROR).json(MESSAGES.SIMPLE_CONNECTION_ERROR);
        res.status(SERVER_STATUS.OK).json(result);
    });
}

const updateUser = async (req, res) => {
    const {id, description = ''} = req.body;
    const query = User.findOneAndUpdate({_id: id}, {description: description}, {new: true}).select(['-password', '-__v']);
    query.exec(function (err, result) {
        if (err) return res.status(SERVER_STATUS.SERVER_ERROR).json(MESSAGES.SIMPLE_CONNECTION_ERROR);
        res.status(SERVER_STATUS.OK).json({user: result});
    });
}

const deleteUsers = async (req, res) => {
    const {userIds = []} = req.body;
    User.deleteMany({_id: {$in: userIds}}, function(err, result) {
        if (err) {
            res.status(SERVER_STATUS.SERVER_ERROR).json(MESSAGES.SIMPLE_CONNECTION_ERROR);
        } else {
            res.status(SERVER_STATUS.OK).json({users: result});
        }
    });
}

module.exports = {
    list,
    updateUser,
    deleteUsers,
    register,
    login
};