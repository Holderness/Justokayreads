var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne(
      {username: username},
      function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, {message: 'Unknown User'}); }
        if (!user.authenticate(password, function(err, isMatch) {
        if (err) { return done(err); }

        // Password did not match
        if (!isMatch) { return done(null, false); }

        // Success
        return done(null, user);
      })) { return done(null, false, {message: 'Invalid Password'}); }
        return done(null, user);
      }
    );
  }));
};