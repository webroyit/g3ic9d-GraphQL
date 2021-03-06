const express = require('express');
const mongoose = require('mongoose');
const expressGraphql = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const token = require('./middleware/checkToken');
const db = require('./keys').mongoURI;

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // express graphql only accept get or post request
    if (req.method === 'OPTIONS') {
        // prevent the execution of option request
      return res.sendStatus(200);
    }
    next();
});

app.use(token);

app.use('/graphql', expressGraphql({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // allow access to GraphiQL(in-browser tool)
    graphiql: true,
    formatError(err){
        if(!err.originalError){
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'Error delected';
        return { message: message, data: data };
    }
}));

app.get('/', (req, res) => res.send('Graph QL Practice'));

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(result => {
        console.log("Database Connected");
        app.listen(8080);
    })
    .catch(err => console.log(err));