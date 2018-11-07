const {run} = require('../connection');

class Model {
    constructor(table) {
        this.table = table;
    }

    parseSeveral(keyValue) {
        const keys = Object.keys(keyValue);
        const values = Object.values(keyValue);
        let columns = '';
        let indexes = '';

        keys.map((key, i) => {
            columns += i === keys.length - 1 ? key : key + ', ';
            indexes += i === keys.length - 1 ? '$' + (i+1) : '$' + (i+1) + ', ';
        });

        return { columns, indexes, values };
    }

    getAll() {
        return run(`
            SELECT
                *
            FROM
                ${this.table}
        `);
    }

    getOne(idColumn, id) {
        return run(`
            SELECT
                *
            FROM
                ${this.table}
            WHERE
                ${idColumn}=${id}
        `);
    }

    createOne(keyValue) {
        const { columns, indexes, values } = this.parseSeveral(keyValue);
        let query = {
            text : `
                INSERT INTO ${this.table} (
                    ${columns}
                ) VALUES (
                    ${indexes}
                ) RETURNING *
            `,
            values : values
        };
        return run(query);
    }

    updateOne(keyValue, idColumn, id) {
        const keys = Object.keys(keyValue);
        const values = Object.values(keyValue);

        let query = {
            text : `
                UPDATE
                    ${this.table}
                SET
                    ${keys.map((key, i) => key + `=$${i+1}`)}
                WHERE
                    ${idColumn}=${id}
                RETURNING *
            `,
            values : values
        };
        return run(query);
    }

    deleteOne(idColumn, id) {
        return run(`
            DELETE FROM
                ${this.table}
            WHERE
                ${idColumn}=${id}
            RETURNING *
        `);
    }
}

module.exports = { Model };
