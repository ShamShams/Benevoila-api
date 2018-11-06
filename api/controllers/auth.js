const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const hashPassword = (user) => {
    // bcrypt.hash(user.password, saltRounds, function(err, hash) {
    // });
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);

    return {
        email: user.email,
        hash: hash
    };
};

const generateToken = (user) => {
    const payload = {
        iat: moment().unix(), // issued at : now
        exp: moment().add(1, 'days').unix(), // expires at
        iss: user.email, //issuer
        sub: user.hash // substring
    };

    return jwt.sign(payload, 'AppSecret');
    // Garder le secret dans les config
};

const auth = {
    register: (req, res) => {
        const newUser = hashPassword({ email: "JohnDoe", password: "S3cr3t" });
        newUser.token = generateToken(newUser);
        res.send(newUser);
    },
    
    login: (req, res) => {
        res.send('User logged');
    },
};

module.exports = auth;