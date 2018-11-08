const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        pwd: process.env.PGPASSWORD
    },
};

module.exports = config;
