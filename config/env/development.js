var port = process.env.PORT || 1313;
var db = process.env.MONGOLAB_URI || 'mongodb://localhost/library_database';

module.exports = {
  port: port,
  db: db,
  facebook: {
        clientID: '1683373935224797',
        clientSecret: '3675daf52fbe3271451c48030332714c',
        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
  },
  twitter: {
    clientID: 'PKYEgk3r3js8iZhBMz0ECoeo0',
    clientSecret: 'oP7nBmve5jW7xqX5srvkL7uZriu1uKOHrY4PQFa8ACrl1zyuhO',
    callbackURL: 'http://localhost:1313/oauth/twitter/callback'
  }
};