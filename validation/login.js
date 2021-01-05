const {
    userNameLength,
    userNameRequired,
    passwordRequired,
    emailRequired,
    emailValid
} = require('../utils/validators');

module.exports = function validateLoginInput(data) {
    const {email, password} = data;
    const validators = [
        passwordRequired(password),
        emailRequired(email),
        emailValid(email)
    ];

    return validators.filter(field => !field.isValid).map(field => field.message);
};