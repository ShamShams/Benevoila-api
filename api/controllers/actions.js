const Actions = require('../../database/models/Actions');

const actions = {

    getAll: async (req, res) => {
        let actions = new Actions();
        let allActions = null;

        try {
            allActions = await actions.getAll();
        } catch (error) {
            res.send(error);
        }
        return res.send(allActions.rows);
    },

    getOne: async (req, res) => {
        const id = req.params.id;

        let actions = new Actions();
        let action = null;

        try {
            action = await actions.getOne('action_id', id);
        } catch (error) {
            res.send(error);
        }
        return res.send(action.rows);
    },

    createOne: async (req, res) => {
        const keyValue = {
            action_type_id: req.body.action_type_id,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            adress: req.body.adress,
            city: req.body.city,
            zipcode: req.body.zipcode,
            nb_volunteers_needed: req.body.nb_volunteers_needed,
            description: req.body.description
        };

        let actions = new Actions();
        let newAction = null;

        try {
            newAction = await actions.createOne(keyValue);
        } catch (error) {
            res.send(error);
        }
        return res.send({'New action created': newAction.rows[0]});
    },

    updateOne: async (req, res) => {
        const id = req.params.id;
        const keyValue = {
            action_type_id: req.body.action_type_id,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            adress: req.body.adress,
            city: req.body.city,
            zipcode: req.body.zipcode,
            nb_volunteers_needed: req.body.nb_volunteers_needed,
            description: req.body.description
        };

        let actions = new Actions();
        let updatedAction = null;

        try {
            updatedAction = await actions.updateOne(keyValue, 'action_id', id);
        } catch (error) {
            res.send(error);
        }
        return res.send({'Action updated': updatedAction.rows});
    },

    deleteOne: async (req, res) => {
        const id = req.params.id;

        let actions = new Actions();
        let deletedAction = null;

        try {
            deletedAction = await actions.deleteOne('action_id', id);
        } catch (error) {
            res.send(error);
        }
        return res.send({'Action deleted': deletedAction.rows});
    }
};

module.exports = actions;
