const express = require("express");
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');



const app = express();

//view engine set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));

//middleware
const indexRouter = require('./src/routes/index.js');

app.use('/', indexRouter);

module.exports = app;