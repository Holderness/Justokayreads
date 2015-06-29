
var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    AWS = require('aws-sdk');


//////////// AWS
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY = process.env.AWS_SECRET_KEY,
    S3_BUCKET = process.env.S3_BUCKET;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY
});


s3 = new AWS.S3({params: {Bucket: S3_BUCKET }});

var uploadToS3 = function(file, destFileName, callback) {
  s3
    .upload({
      ACL: 'public-read',
      Body: fs.createReadStream(file.path),
      Key: destFileName.toString()
    })
    .send(callback);
};


////////////Models
var BookModel = require('mongoose').model('Book');



////////////exports

exports.cookingWithGas = function(req, res, next) {
  res.send( 'Library API is running' );
};


exports.multerRestrictions = multer({limits: {fileSize:10*1024*1024}});


exports.uploadCoverImage = function (req, res, next) {

  console.log('req.files: ', req.files);
  console.log('----------------------------------------------------------------');
  console.log('req.files.coverImageUpload: ', req.files.coverImageUpload);

  if (!req.files || !req.files.coverImageUpload) {
    return res.status(403).send('expect 1 file upload named coverImageUpload').end();
  }
  var coverImageUpload = req.files.coverImageUpload;

  // this is mainly for user friendliness. this field can be tampered by attacker.
  if (!/^image\/(jpe?g|png|gif)$/i.test(coverImageUpload.mimetype)) {
    return res.status(403).send('expect image file').end();
  }

  uploadToS3(coverImageUpload, coverImageUpload.name, function (err, data) {
    if (err) {
      console.error(err);
      return res.status(500)
        .send('failed to upload to s3')
        .end();
    }
      // console.log('data: ', data);
    res.status(200)
      .send({ url: data.Location, ETag: data.ETag })
      .end();
  });
};


exports.findAll = function(req, res, next) {
  return BookModel.find( { userId: req.user._id }, function( err, books ) {
    if (!err) {
      return res.send( books );
    } else {
      return console.log( err );
    }
  });
};


exports.add = function(req, res, next) {
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
};

exports.find = function(req, res, next) {
  return BookModel.find( { userId: req.user._id, _id: req.params.id }, function( err, book ) {
    if (!err) {
      return res.send( book );
    } else {
      return console.log( err );
    }
  });
};


exports.update = function(req, res, next) {
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
};

exports.remove = function(req, res, next) {
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
};



exports.findBy = function(req, res, next) {
  console.log( 'user: ', req.user );
  console.log( 'req.query: ', req.query );
  var term = req.query.term;
  var value = req.query.value;
  console.log('term: ', term);
  console.log('value: ', value);

  return BookModel.find({ userId: req.user._id, $or: [ {author: {$regex: value, $options: 'i' }}, {title: {$regex: value, $options: 'i'  }}, {keywords: { '$elemMatch': {keyword: {$regex: value, $options: 'i' }}}} ]  }, function( err, book ) {
    if (!err) {
      console.log( book );
      return res.send( book );
    } else {
      return console.log( err );
    }
  });

};



