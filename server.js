const express = require('express');
const mongoose = require('mongoose');
const expressGraphql = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const db = require('./keys').mongoURI;

const app = express();

app.use('/graphql', expressGraphql({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // allow access to GraphiQL(in-browser tool)
    graphiql: true
}));

app.get('/', (req, res) => res.send('Graph QL Practice'));

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(result => {
        console.log("Database Connected");
        app.listen(8080);
    })
    .catch(err => console.log(err));