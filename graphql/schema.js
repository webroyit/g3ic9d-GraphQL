// allow to create schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(
    // ! means required
    `
        type Paper{
            text: String!
            size: Int!
            count: Int!
        }
        type Query{
            test: Paper!
        }

        schema {
            query: Query
        }
    `
);