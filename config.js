const config = {};

config.port = process.env.PORT || 3000

config.server = {
    secret: process.env.APP_SECRET
};

config.db = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    pwd: process.env.PGPASSWORD,
};

module.exports = config;
