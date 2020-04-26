const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User')

mongoose.connect(keys.mongoURI);

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
require('./router')(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);