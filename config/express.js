var config = require('./config'),
    express = require('express'),
    ejs = require('ejs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    bcrypt = require('bcrypt-nodejs'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session');

module.exports = function() {

  var app = express();

  ejs.delimiter = '$';

  // parses request body and populates request.body
  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( bodyParser.json() );

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET
  }));

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());


  //routes
  require('../app/routes/index.js')(app);
  require('../app/routes/users.js')(app);
  require('../app/routes/book.js')(app);

  app.use(express.static( path.join( __dirname, '../public') ) );

  return app;

};