const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Graph QL Practice'));

app.listen(8080);