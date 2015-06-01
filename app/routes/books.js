
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


//Connect to db
mongoose.connect( 'mongodb://localhost/library_database' );

//Schemas
var User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

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
  comment: String
});

var app = express();
app.use(bodyParser.json());



//Models
var BookModel = mongoose.model( 'Book', Book );

router = express.Router();

router.route('/api')
  .get(function(req, res){
    res.send( 'Library API is running' );
  });

router.route('/api/cover')
  .post(function(req, res) {
    return res.send({ path: "/img/uploads/" + req.files.coverImageUpload.name });
  });

router.route('/api/books')
  .get(function(req, res) {
    return BookModel.find( function( err, books ) {
       if (!err) {
         return res.send( books );
       } else {
         return console.log( err );
       }
    });
  })
  .post(function(req, res) {
    var book = new BookModel({
      coverImage: req.body.coverImage,
      title: req.body.title,
      author: req.body.author,
      dateCompleted: req.body.dateCompleted,
      created: req.body.created,
      stars: null,
      keywords: req.body.keywords,
      comment: ''
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

router.route('/api/books/:id')
  .get(function(req, res) {
    return BookModel.findById( req.params.id, function( err, book ) {
      if (!err) {
        return res.send( book );
      } else {
        return console.log( err );
      }
    });
  })
  .put(function(req, res) {
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
  .delete(function(req, res) {
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







module.exports = router;