require('dotenv').config();
const express = require("express");
const cors = require('express-cors');
// const bodyParser = require("body-parser");
const app = express();

const express_graphql = require('express-graphql');

app.use(cors({allowedOrigins: ['localhost:3000']}));
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

app.get('/graphql/login', require('./routes/login').get);
app.post('/graphql/register', require('./routes/register').post);


app.use('/graphql', require('./middleware/tokenChecker'));
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

// const bearerToken = require('express-bearer-token');
// app.use(cors({allowedOrigins: ['localhost:3000']}));
// app.use(bearerToken());
// app.use(bodyParser.json());
//
// require('./routes')(app);

app.listen(4000, () => {
    console.log('server is starting', 4000);
});
