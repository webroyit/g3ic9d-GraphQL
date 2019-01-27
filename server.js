const express = require('express');
const expressGraphql = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use('/graphql', expressGraphql({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // allow access to GraphiQL(in-browser tool)
    graphiql: true
}));

app.get('/', (req, res) => res.send('Graph QL Practice'));

app.listen(8080);