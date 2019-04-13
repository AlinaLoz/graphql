const {buildSchema} = require("graphql");

const schema = buildSchema(`
    type Mutation {
      createTeam(name: String!, users: [InputUser]): String!
      dropTeam(id: ID): Message
      updateNameTeam(id: ID, name: String): String!
      createBoard(name: String!, isTeamBoard: Boolean, team: Team) : String!
    } 
    
    type Query { 
        auth      : AuthUser,
        teamAll   : [Team],
        getOneTeam(id: ID!): Team
        checkUser(login: String!): User
        getBoards: [Board]
    }
    
    type AuthUser {
      auth : Boolean,
      token: String
    }
    
    type Team {
      id   : ID,
      name : String,
      users: [User]
    }
    
    type User {
      id   : ID,
      login: String,
      message: String
    }
     
    type Board {
      id: ID,
      name: String, 
      ownerIsTeam: Boolean
    }
    
    input InputUser {
      id   : ID,
      login: String
    }
    
    type Message {
      message: String,
      id: Int
    }
`);

module.exports = schema;
