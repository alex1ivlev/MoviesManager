const user = require('./user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function createPassword(rawPass) {

    return crypto.createHmac('sha256', process.env.PASSWORD_SECRET)
        .update(rawPass)
        .digest('hex');
}

exports.addUser = function (newUser) {
    return new Promise((resolve, reject) => {


        let u = new user({
            name: newUser.name,
            username: newUser.username,
            password: createPassword(newUser.password),

        });

        u.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(u);
            }
        })
    })
}

exports.login = function (username, rawPass) {
    return new Promise((resolve, reject) => {
        user.findOne({username: username, password: createPassword(rawPass)}, function (err, user) {
            if (user === null) {
                reject({error: "not found"});
            } else {
                resolve(jwt.sign({user_id: user._id, username: username, name: user.name}, process.env.JWT_SECRET, {expiresIn: '1h'}));
            }
        })
    })
}

