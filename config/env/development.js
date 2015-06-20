
env = require('node-env-file');
env('.env');


var port = process.env.PORT || 1313;
var db = process.env.MONGOLAB_URI || 'mongodb://localhost/library_database';
var fbCallback = port === 1313 ?
      'http://localhost:'+ port +'/oauth/facebook/callback' :
      'https://bklst.herokuapp.com/oauth/facebook/callback';
var twCallback = port === 1313 ?
      'http://localhost:1313/oauth/twitter/callback' :
      'https://bklst.herokuapp.com/oauth/twitter/callback';

module.exports = {
  port: port,
  db: db,
  facebook: {
        clientID: process.env.fbClientID,
        clientSecret: process.env.fbClientSecret,
        callbackURL: fbCallback
  },
  twitter: {
    clientID: process.env.twClientID,
    clientSecret: process.env.twClientSecret,
    callbackURL: twCallback
  }
};