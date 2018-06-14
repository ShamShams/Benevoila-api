const SQL = require('sql-template-strings');

const client = require('../db');

const getAll = async (req, res) => {
    const querySql = SQL`
        SELECT
            *
        FROM
            action_types
    `
    let actionTypes = null;
    try {
        actionTypes = await client.query(querySql);
    } catch (error) {
        res.status(500).send(new Error("Erreur dans la récupération des types d'action", error));
    }
    return res.status(200).send(actionTypes.rows);
};

const getOne = async (req, res) => {
    const querySql = SQL`
        SELECT
            *
        FROM
            action_types
        WHERE
            action_type_id=${req.params.id}
    `
    let actionType = null;
    try {
        actionType = await client.query(querySql);
    } catch (error) {
        res.status(500).send(new Error("Erreur dans la récupération des types d'action", error));
    }
    return res.status(200).send(actionType.rows);
};

const createOne = async (req, res) => {
    const { name, description } = req.body;
    const querySql = SQL`
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
        newActionType = await client.query(querySql);
    } catch (error) {
        res.status(500).send(error);
    }
    return res.status(200).send(newActionType.rows);
};

const updateOne = async (req, res) => {
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
    `
    let updatedActionType = null;
    try {
        updatedActionType = await client.query(querySql);
    } catch (error) {
        res.status(500).send(error);
    }
    return res.status(200).send(updatedActionType.rows);
};

module.exports = { getAll, getOne, createOne, updateOne };
