// allow to create schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(
    // Create data
    // ! means required
    `
        type Food{
            _id: ID!
            name: String!
            price: Int!
            date: String!
            origin: Account!
        }

        type Account{
            _id: ID!
            username: String!
            password: String!
            bio: String!
            foods: [Food!]!
        }

        type LoginData{
            token: String!
            accountId: String!
        }

        type FoodData{
            foods: [Food!]!
        }

        input DataInput{
            username: String!
            password: String!
            bio: String!
        }

        input FoodInput{
            name: String!
            price: Int!
        }

        type Mutation{
            createAccount(accountData: DataInput): Account!
            addFood(foodData: FoodInput): Food!
        }

        type RootQuery{
            login(username: String!, password: String!): LoginData!
            foods: FoodData!
        }

        schema {
            query: RootQuery
            mutation: Mutation
        }
    `
);