var port = 1313;

module.exports = {
  port: port,
  db: 'mongodb://localhost/library_database',
  facebook: {
        clientID: '1683373935224797',
        clientSecret: '3675daf52fbe3271451c48030332714c',
        callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
  },
  twitter: {}
};