// allow to create schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(
    // Create data
    // ! means required
    `
        type List{
            _id: ID!
            action: String!
            time: String!
            date: String!
            note: String!
            origin: Account!
        }

        type Account{
            _id: ID!
            username: String!
            password: String!
            bio: String!
            lists: [List!]!
        }

        type LoginData{
            token: String!
            accountId: String!
        }

        input DataInput{
            username: String!
            password: String!
            bio: String!
        }
        type Mutation{
            createAccount(accountData: DataInput): Account!
        }

        type RootQuery{
            login(username: String!, password: String!): LoginData!
        }

        schema {
            query: RootQuery
            mutation: Mutation
        }
    `
);