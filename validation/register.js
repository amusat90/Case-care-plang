const {
    userNameLength,
    userNameRequired,
    passwordRequired,
    passwordMismatch,
    passwordLength,
    passwordConfirm,
    emailRequired,
    emailValid
} = require('../utils/validators');


module.exports = function validateRegisterInput(data) {
    const {name = '', email = '', password = '', passwordConfirmation = ''} = data;
    const validators = [
        userNameLength(name),
        userNameRequired(name),
        passwordRequired(password),
        passwordMismatch(password, passwordConfirmation),
        passwordLength(password),
        passwordConfirm(passwordConfirmation),
        emailRequired(email),
        emailValid(email)
    ];

    return validators.filter(field => !field.isValid).map(field => field.message);
};