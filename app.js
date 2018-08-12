const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/');
const app = express();

app.set('certs', __dirname + '/certs');
app.set('keys', __dirname + '/keys');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/ping', (req, res) => {
   res.end('pong');
});
app.use('/api', routes);

module.exports = app;
