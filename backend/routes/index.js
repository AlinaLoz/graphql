const graphqlHTTP = require('express-graphql');
const schema = require('../graphql/schema');
const resolver = require('../graphql/resolver');

const tokenChecker =  require('../middleware/tokenChecker');

module.exports = (app) => {
  app.get('/login', require('../routes/login').get);
  app.post('/register', require('../routes/register').post);

  app.post('/graphql', tokenChecker, graphqlHTTP(req => ({
    schema: schema,
    rootValue: resolver,
    context: {
      idUser:req.id,
      token :req.token,
    },
    graphiql: true
  })));
};