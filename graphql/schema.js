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
            name: String!
            password: String
            bio: String!
            lists: [List!]!
        }

        input DataInput{
            name: String!
            password: String!
            bio: String!
        }
        type Mutation{
            createAccount(accountData: DataInput): Account!
        }

        schema {
            mutation: Mutation
        }
    `
);