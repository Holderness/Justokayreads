
var express = require('express'),
    mongoose = require('mongoose');


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
	releaseDate: Date,
	keywords: [ Keywords ]
});



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
      releaseDate: req.body.releaseDate,
      keywords: req.body.keywords
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
    return BookModel.findById( request.params.id, function( err, book ) {
      book.title = req.body.title;
      book.author = req.body.author;
      book.releaseDate = req.body.releaseDate;
      book.keywords = req.body.keywords;

      return book.save( function( err ) {
        if (!err) {
          console.log( 'book updated' );
        } else {
           console.log( err );
        }
        return response.send( book );
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