process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport'),
    errorHandler = require('errorhandler');

var db = mongoose(),
    app = express(),
    passport = passport();


  // show all errors in development
if (app.settings.env === 'development') {
  app.use( errorHandler({ dumpExceptions: true, showStack: true }) );
}

app.listen( config.port, function() {
	console.log( 'Express server listening on port %d in %s mode',
		config.port, app.settings.env );
});

module.exports = app;