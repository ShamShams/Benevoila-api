require('dotenv').load();

const express = require('express');

const routes = require('./api/routes');

const config = require('./config');
const port = config.port;

const app = express();

app.use(routes);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
