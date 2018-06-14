const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'benevolat-db',
    user: 'postgres',
    password: 'admin'
});

(async () => {
    await client.connect();
})();

module.exports = client;
