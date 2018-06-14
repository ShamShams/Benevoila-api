const SQL = require('sql-template-strings');

const client = require('../db');

const getAll = async (req, res) => {
    const query = SQL`
        SELECT
            *
        FROM
            action_types
    `
    let actionTypes = null;
    try {
        actionTypes = await client.query(query);
    } catch (error) {
        res.status(500).send(new Error("Erreur dans la récupération des types d'action", error));
    }
    return res.status(200).send(actionTypes.rows);
};

const createOne = async (req, res) => {
    const { name, description } = req.body;
    const query = SQL`
        INSERT INTO action_types (
            name,
            description
        ) VALUES (
            ${name},
            ${description}
        ) RETURNING *
    `
    let newActionType = null;
    try {
        newActionType = await client.query(query);
    } catch (error) {
        res.status(500).send(error);
    }
    return res.status(200).send(newActionType.rows[0]);
};

module.exports = { getAll, createOne };
