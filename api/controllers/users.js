const Users = require('../../database/models/Users');

const users = {

    getAll: async (req, res) => {
        let users = new Users();
        let allUsers = null;

        try {
            allUsers = await users.getAll();
        } catch (error) {
            res.send(error);
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
            res.send(error);
        }
        return res.send(user.rows);
    },

    createOne: async (req, res) => {
        const keyValue = {
            role: 'volunteer',
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
        };
        if (req.body.photo) {
            keyValue.photo = req.body.photo;
        };

        let users = new Users();
        let newUser = null;

        try {
            newUser = await users.createOne(keyValue);
        } catch (error) {
            res.send(error);
        }
        return res.send({'New user added': newUser.rows[0]});
    },

    updateOne: async (req, res) => {
        const id = req.params.id;
        const keyValue = {
            role: 'volunteer',
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
        };
        if (req.body.photo) {
            keyValue.photo = req.body.photo;
        };

        let users = new Users();
        let updatedUser = null;

        try {
            updatedUser = await users.updateOne(keyValue, 'user_id', id);
        } catch (error) {
            res.send(error);
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
            res.send(error);
        }
        return res.send({'User deleted': deletedUser.rows});
    }
};

module.exports = users;
