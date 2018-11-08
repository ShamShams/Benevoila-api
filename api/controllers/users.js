const Users = require('../../database/models/Users');
const {hashPassword, generateToken} = require('../lib/authentication');

const users = {
    createOne: async (req, res) => {
        // Vérfier password avec regex
        const hashedPassword = await hashPassword(req.body.password);

        const userInfos = {
            role: 'volunteer',
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            image: null
        };
        let users = new Users();
        let newUser = null;
        try {
            newUser = await users.createOne(userInfos);
        } catch (error) {
            res.send(error.message);
        }
        newUser.token = generateToken(newUser);
        return res.send({'New user created': newUser.rows[0], token: newUser.token});
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
