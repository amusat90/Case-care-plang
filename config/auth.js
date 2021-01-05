const authRequirements = {
    minUserNameLength: 1,
    maxUserNameLength: 20,
    minPasswordLength: 6,
    maxPasswordLength: 30,
    maxLoginAttempts: 5
};

module.exports = authRequirements;