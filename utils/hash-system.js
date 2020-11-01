const bcrypt = require('bcryptjs');

const hashPassword = async (user) => {
    return new Promise(resolve => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                resolve(user.save());
            });
        });
    }, err => {
        throw err;
    });
};

module.exports = {
    hashPassword
}