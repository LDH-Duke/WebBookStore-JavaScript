const express = require("express");
const path = require('path');
const logger = require('morgan');


const app = express();

//app setting
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


module.exports = app;