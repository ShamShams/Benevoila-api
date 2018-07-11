const ActionTypes = require('../../database/models/ActionTypes');

const actionTypes = {

    getAll: async (req, res) => {
        let actionTypes = new ActionTypes();
        let allActionTypes = null;

        try {
            allActionTypes = await actionTypes.getAll();
        } catch (error) {
            res.send(error);
        }
        return res.send(allActionTypes.rows);
    },

    getOne: async (req, res) => {
        const id = req.params.id;

        let actionTypes = new ActionTypes();
        let actionType = null;

        try {
            actionType = await actionTypes.getOne('action_type_id', id);
        } catch (error) {
            res.send(error);
        }
        return res.send(actionType.rows);
    },

    createOne: async (req, res) => {
        const keyValue = {
            name: req.body.name,
            description: req.body.description
        };

        let actionTypes = new ActionTypes();
        let newActionType = null;

        try {
            newActionType = await actionTypes.createOne(keyValue);
        } catch (error) {
            res.send(error);
        }
        return res.send({'New action type created': newActionType.rows[0]});
    },

    updateOne: async (req, res) => {
        const id = req.params.id;
        const keyValue = {
            name: req.body.name,
            description: req.body.description
        };

        let actionTypes = new ActionTypes();
        let updatedActionType = null;

        try {
            updatedActionType = await actionTypes.updateOne(keyValue, 'action_type_id', id);
        } catch (error) {
            res.send(error);
        }
        return res.send({'Action type updated': updatedActionType.rows});
    },

    deleteOne: async (req, res) => {
        const id = req.params.id;

        let actionTypes = new ActionTypes();
        let deletedActionType = null;

        try {
            deletedActionType = await actionTypes.deleteOne('action_type_id', id);
        } catch (error) {
            res.send(error);
        }
        return res.send({'Action type deleted': deletedActionType.rows});
    }
};

module.exports = actionTypes;
