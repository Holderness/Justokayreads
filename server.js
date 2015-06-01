var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    multer = require('multer');

var app = express();


	// parses request body and populates request.body
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( multer({ dest: './app/img/uploads/' }) );

  //routes

var books = require('./app/routes/books');
app.use( '/api', books );

app.use( express.static( path.join( application_root, 'app') ) );


  // show all errors in development
if (app.settings.env === 'development') {
  app.use( errorHandler({ dumpExceptions: true, showStack: true }) );
}


var port = 1313;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode',
		port, app.settings.env );
});