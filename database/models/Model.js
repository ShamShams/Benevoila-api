const connection = require('../connection');

class Model {
    constructor(table) {
        this.table = table;
    }

    parseSeveral (keyValue) {
        const keys = Object.keys(keyValue);
        let columns = '';
        let indexes = '';
        let values = [];
        for (const [index, key] of keys.entries()) {
            columns += index === keys.length - 1 ? key : key + ',';
            indexes += index === keys.length - 1 ? '$' + ( index + 1 ) : '$' + ( index + 1 ) + ',';
            values.push(keyValue[key]);
        }
        return {columns, indexes, values};
    }

    getAll() {
        return connection.run(`SELECT * FROM ${this.table}`);
    }

    getOne(idColumn, id) {
        return connection.run(`SELECT * from ${this.table} WHERE ${idColumn}=${id}`);
    }

    createOne(keyValue) {
        const { columns, indexes, values } = this.parseSeveral(keyValue);
        let query = {
            text : `INSERT INTO ${this.table}(${columns}) VALUES(${indexes})`,
            values : values
        };
        return connection.run(query);
    };

    getByOne(keyValue) {
        const { columns, indexes, values } = this.parseSeveral(keyValue);
        let query = {
            text : `SELECT * FROM ${this.table} WHERE ${columns}=${indexes}`,
            values : values
        };
        return connection.run(query);
    }
}

module.exports = { Model };
