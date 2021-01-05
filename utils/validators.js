const Validator = require('validator');

const {MESSAGES} = require('../constants/strings');
const {
    minPasswordLength,
    maxPasswordLength,
    minUserNameLength,
    maxUserNameLength
} = require('../config/auth');

const isEmpty = (value) => {
    return {
        isValid: value !== undefined ||
            value !== null ||
            (typeof value !== 'object' && Object.keys(value).length !== 0) ||
            (typeof value !== 'string' && value.trim().length !== 0),
        message: MESSAGES.USERNAME_IS_REQUIRED
    }
};

const userNameLength = (value) => {
    return {
        isValid: Validator.isLength(value, {
            min: minUserNameLength,
            max: maxUserNameLength
        }),
        message: MESSAGES.USERNAME_LENGTH
    }
};

const userNameRequired = (value) => {
    return {
        isValid: !Validator.isEmpty(value),
        message: MESSAGES.USERNAME_IS_REQUIRED
    }
}

const emailValid = (value) => {
    return {
        isValid: Validator.isEmail(value),
        message: MESSAGES.EMAIL_IS_NOT_VALID
    }
};

const emailRequired = (value) => {
    return {
        isValid: !Validator.isEmpty(value),
        message: MESSAGES.EMAIL_IS_REQURIED
    }
}

const passwordLength = (value) => {
    return {
        isValid: Validator.isLength(value, {
            min: minPasswordLength,
            max: maxPasswordLength
        }),
        message: MESSAGES.PASSWORD_LENGTH
    }
};

const passwordRequired = (value) => {
    return {
        isValid: !Validator.isEmpty(value),
        message: MESSAGES.PASSWORD_IS_REQUIRED
    }
};

const passwordConfirm = (value) => {
    return {
        isValid: !Validator.isEmpty(value),
        message: MESSAGES.CONFIRM_PASSWORD_REQUIRED
    }
};

const passwordMismatch = (initValue, confirmValue) => {
    return {
        isValid: Validator.equals(initValue, confirmValue),
        message: MESSAGES.PASSWORD_MISSMATCH
    }
};

module.exports = {
    emailValid,
    emailRequired,
    passwordConfirm,
    passwordLength,
    passwordMismatch,
    passwordRequired,
    isEmpty,
    userNameLength,
    userNameRequired
}