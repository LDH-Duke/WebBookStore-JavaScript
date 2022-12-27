const express = require("express");
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



//
const indexRouter = require('./src/routes/index.js');

const app = express();

//session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

var options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "bookstore1",
  };
  
  var sessionStore = new MySQLStore(options);

  app.use(
    session({
      key: "session_cookie_name",
      secret: "session_cookie_secret",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );


//view engine set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//middleware use
app.use(logger('dev'));
app.use(cookieParser());

//router
app.use('/', indexRouter);

module.exports = app;