require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin'  : 'http://localhost:3000',
        'Access-Control-Allow-Methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        "Access-Control-Allow-Headers" : "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    });
    next();
});

app.use(bodyParser.json());

require('./routes')(app);

app.listen(4000, () => {
    console.log('server is starting', 4000);
});
