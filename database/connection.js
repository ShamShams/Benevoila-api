const { Client } = require('pg');

const { db } = require('../config');

const client = new Client({
    host: db.host,
    port: db.port,
    database: db.database,
    user: db.user,
    password: db.password
});

module.exports = {
    run :  async (query) => {
        await client.connect();
        response = await client.query(query);
        await client.end();
        return response;
    }
};
