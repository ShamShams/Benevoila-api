const connection = require('../connection');

const { Model } = require('./Model');

class Actions extends Model {
    constructor() {
        super('actions');
    }

    getAllWithType() {
        return connection.run(`
            SELECT
                *
            FROM
                actions
            NATURAL LEFT OUTER JOIN
                action_types
        `);
    }
}

module.exports = Actions;
