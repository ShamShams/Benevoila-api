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
        return res.send(allActionTypes);
    },

    getOne: async (req, res) => {
        let actionTypes = new ActionTypes();
        let actionType = null;
        const id = req.params.id;
        try {
            actionType = await actionTypes.getOne('action_type_id', id);
        } catch (error) {
            res.send(error);
        }
        return res.send(actionType.rows);
    },

    createOne: async (req, res) => {
        const { name, description } = req.body;
        const keyValue = {
            name: name,
            description: description
        };
        let actionTypes = new ActionTypes();
        let newActionType = null;
        try {
            newActionType = await actionTypes.createOne(keyValue);
        } catch (error) {
            res.send(error);
        }
        return res.send(newActionType);
    },

    updateOne: async (req, res) => {
        const { name, description } = req.body;
        const querySql = SQL`
            UPDATE
                action_types
            SET
                name=${name},
                description=${description}
            WHERE
                action_type_id=${req.params.id}
            RETURNING *
        `;
        let updatedActionType = null;
        try {
            updatedActionType = await connection.query(querySql);
        } catch (error) {
            res.send(error);
        }
        return res.send(updatedActionType.rows);
    },

    deleteOne: async (req, res) => {
        const querySql = SQL`
            DELETE FROM
                action_types
            WHERE
                action_type_id=${req.params.id}
            RETURNING *
        `;
        let deletedActionType = null;
        try {
            deletedActionType = await connection.query(querySql);
        } catch (error) {
            res.send(error);
        }
        return res.send(deletedActionType.rows);
    }
};

module.exports = actionTypes;
