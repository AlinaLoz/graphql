require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

const tokenChecker =  require('./middleware/tokenChecker');

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin'  : 'http://localhost:3000',
        'Access-Control-Allow-Methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        "Access-Control-Allow-Headers" : "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    });
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));

app.get('/login', require('./routes/login').get);
app.post('/register', require('./routes/register').post);

app.post('/graphql', tokenChecker, graphqlHTTP(req => ({
    schema: schema,
    rootValue: resolver,
    context: {
        idUser:req.id,
        token :req.token,
    },
    graphiql: true
})));

app.listen(4000, () => {
    console.log('server is starting', 4000);
});
