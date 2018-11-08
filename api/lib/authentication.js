const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },
    
    generateToken: (id) => {
        if (process.env.APP_SECRET) {
            const payload = {
                userId: id
            };
            const token = jwt.sign(payload, process.env.APP_SECRET, {expiresIn: '1d'});
            return token;
        } else {
            throw new Error('Cannot generate token, secret not found');
        }
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