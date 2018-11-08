const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const {server} = require('../../config');

module.exports = {
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },
    
    generateToken: (user) => {
        const payload = {
            iat: moment().unix(), // issued at : now
            exp: moment().add(1, 'days').unix(), // expires at
            iss: user.email, //issuer
            sub: user.hash // substring
        };
        return jwt.sign(payload, server.secret);
    },
    
    verifyLogin: (req, user) => {
        if (user) return {success: false, msg: 'User doesn’t exist'};
        if (bcrypt.compareSync(req.body.password, user.hash)) {
            return {success: true, msg: 'User successfully logged in'};
        } else {
            return {success: false, msg: 'Wrong password'};
        }
    },
    // login: (req, res) => {
    //     const bddUser = { email: "JohnDoe", hash: "$2b$10$ATnNLHx2sGfzORRL5vRiFOolz7ApafWXmBQPKzitsEu0D044DNEaG" };
        
    //     const logged = verifyLogin(req.body, bddUser);
    //     if (logged.success) {
    //         bddUser.token = generateToken(bddUser);
    //         res.send(bddUser);
    //     } else {
    //         res.send(logged.msg);
    //     }
    // },
};