const express = require("express");
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');



//
const indexRouter = require('./src/routes/index.js');

const app = express();

//session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


//view engine set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//middleware use
app.use(logger('dev'));
app.use('/', indexRouter);

module.exports = app;