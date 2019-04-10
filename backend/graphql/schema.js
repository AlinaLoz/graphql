const {buildSchema} = require("graphql");

const schema = buildSchema(`
    type Query {
        message: String,
        auth(Token: Int!): Boolean
    }
`);

module.export = schema;