const bcrypt = require('bcrypt');

const Users = require('../../database/models/Users');
const { hashPassword, generateToken } = require('../lib/authentication');

const emailRegex = /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/;

const users = {
    createOne: async (req, res) => {
        let users = new Users();

        const emailAlreadyExist = await users.getUserByEmail(req.body.email).rowCount;
        if (emailAlreadyExist) {
            res.send('Email already exist');
        }
        
        if (!emailRegex.test(req.body.email)) {
            res.send('Wrong email. Please type a valid email.');
        } else {
            // On hash le password avant d'enregistrer le user dans la base de données
            const hashedPassword = await hashPassword(req.body.password);
            
            const userInfos = {
                role: 'volunteer', // Le user est bénévole par défaut
                email: req.body.email,
                password: hashedPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                image: null
            };
            let newUser = null;
            try {
                newUser = await users.createOne(userInfos);
            } catch (error) {
                res.send(error.message);
            }
            const token = generateToken(newUser.rows[0].user_id);
            return res.send({'New user created': newUser.rows[0], token: token});
        }
    },

    login: async (req, res) => {
        let users = new Users();
        let userToLog = null;
        try {
            userToLog = await users.getUserByEmail(req.body.email);
            if (!userToLog.rowCount) {
                res.send('User not found');
            } 
            const isPasswordRight = await bcrypt.compare(req.body.password, userToLog.rows[0].password);
            if (!isPasswordRight) {
                res.send('Wrong password');
            }
        } catch (error){
            res.send(error.message);
        }
        res.send(`Bienvenue ${userToLog.rows[0].firstname}`);
        // RAF : TOKEN
    },

    getAll: async (req, res) => {
        let users = new Users();
        let allUsers = null;

        try {
            allUsers = await users.getAll();
        } catch (error) {
            res.send(error.message);
        }
        return res.send(allUsers.rows);
    },

    getOne: async (req, res) => {
        const id = req.params.id;

        let users = new Users();
        let user = null;

        try {
            user = await users.getOne('user_id', id);
        } catch (error) {
            res.send(error.message);
        }
        return res.send(user.rows);
    },

    updateOne: async (req, res) => {
        const id = req.params.id;
        const keyValue = {
            role: 'volunteer',
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            image: req.body.image
        };

        let users = new Users();
        let updatedUser = null;

        try {
            updatedUser = await users.updateOne(keyValue, 'user_id', id);
        } catch (error) {
            res.send(error.message);
        }
        return res.send({'User updated': updatedUser.rows});
    },

    deleteOne: async (req, res) => {
        const id = req.params.id;

        let users = new Users();
        let deletedUser = null;

        try {
            deletedUser = await users.deleteOne('user_id', id);
        } catch (error) {
            res.send(error.message);
        }
        return res.send({'User deleted': deletedUser.rows});
    }
};

module.exports = users;
