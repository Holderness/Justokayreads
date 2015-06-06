
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
    passport = require('passport');

var authController = require('../controllers/auth');

//Connect to db
mongoose.connect( 'mongodb://localhost/library_database' );


//Schemas

var Keywords = new mongoose.Schema({
  keyword: String
});

var Book = new mongoose.Schema({
  coverImage: String,
  title: String,
  author: String,
  dateCompleted: Date,
  created: Date,
  stars: Number,
  keywords: [ Keywords ],
  comment: String,
  userId: String
});

// var User = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // schema pre
// //executes before each user.save() call
// User.pre('save', function(callback) {
//   var user = this;

//   // Break out if the password hasn't changed
//   if (!user.isModified('password')) return callback();
  
//   // Password changed so we need to hash it
//   bcrypt.genSalt(5, function(err, salt) {
//     if (err) return callback(err);

//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return callback(err);
//       user.password = hash;
//       callback();
//     });
//   });
// });

// // Schema Methods
// User.methods.verifyPassword = function(password, cb) {
//   bcrypt.compare(password, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };


var app = express();
app.use(bodyParser.json());


//Models
var BookModel = mongoose.model( 'Book', Book );
var UserModel = require('mongoose').model('User');



// Passport

// passport.use( new BasicStrategy(
//   function(username, password, callback) {
//     UserModel.findOne({ username: username }, function (err,user) {
//       if (err) {return callback(err); }
//       if (!user) { return callback(null, false); }
//       user.verifyPassword(password, function(err, isMatch) {
//         if (err) {return callback(err); }
//         if (!isMatch) { return callback(null, false); }
//         return callback(null, user);
//       });
//     });
//   }
// ));


// var isAuthenticated = passport.authenticate('basic', {session : false });



// Routers

router = express.Router();

router.route('/')
  .get(authController.isAuthenticated, function(req, res){
    console.log(req);
    res.send( 'Library API is running' );
  });

router.route('/logout')
  .get(authController.isAuthenticated, function(req, res){
    res.redirect('/');
  });

router.route('/cover')
  .post(authController.isAuthenticated, function(req, res) {
    return res.send({ path: "/img/uploads/" + req.files.coverImageUpload.name });
  });

router.route('/books')
  .get(authController.isAuthenticated, function(req, res) {
    console.log(req.user._id);
    return BookModel.find( { userId: req.user._id }, function( err, books ) {
       if (!err) {
         return res.send( books );
       } else {
         return console.log( err );
       }
    });
  })
  .post(authController.isAuthenticated, function(req, res) {
    var book = new BookModel({
      coverImage: req.body.coverImage,
      title: req.body.title,
      author: req.body.author,
      dateCompleted: req.body.dateCompleted,
      created: req.body.created,
      stars: null,
      keywords: req.body.keywords,
      comment: '',
      userId: req.user._id
    });
    book.save( function( err ) {
      if (!err) {
        return console.log ( 'created' );
      } else {
        return console.log ( err );
      }
    });
    return res.send( book );
  });

router.route('/books/:id')
  .get(authController.isAuthenticated, function(req, res) {
    return BookModel.find( { userId: req.user._id, _id: req.params.id }, function( err, book ) {
      if (!err) {
        return res.send( book );
      } else {
        return console.log( err );
      }
    });
  })
  .put(authController.isAuthenticated, function(req, res) {
    console.log('Updating book ' + req.body.title );
    return BookModel.findById( req.params.id, function( err, book ) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.dateCompleted = req.body.dateCompleted;
      book.stars = req.body.stars;
      book.keywords = req.body.keywords;
      book.comment = req.body.comment;
      return book.save( function( err ) {
        if (!err) {
          console.log( 'book updated' );
        } else {
           console.log( err );
        }
        return res.send( book );
      });
    });
  })
  .delete(authController.isAuthenticated, function(req, res) {
    console.log( 'Deleting book with id: ' + req.params.id );
    return BookModel.findById( req.params.id, function( err, book ) {
      return book.remove( function( err ) {
        if (!err) {
         console.log( 'Book removed' );
        } else {
         console.log( err );
        }
      });
    });
  });


router.route('/users')
  .get(function(req, res) {
    return UserModel.find(function(err, users) {
      if (err) res.send(err);
      return res.send(users);
    });
  })
  .post(function(req, res) {
    console.log('Creating user ' + req.body.username);
    var user = new UserModel({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err) {
      if (err) res.send(err);
      return res.send({message: 'New User: ' + req.body.username});
    });

    console.log('usrrr', req.user);
  });





module.exports = router;


