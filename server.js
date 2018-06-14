const express = require('express');

const routes = require('./routers/router');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('App is listening on port 3000');
})
