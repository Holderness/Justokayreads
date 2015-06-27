

var book = require('../../app/controllers/book');

module.exports = function(app) {
  app.route('/api').get(book.cookingWithGas);

  app.route('/api/coverUpload').post(book.multerRestrictions, book.uploadCoverImage);

  app.route('/api/books').get(book.findAll).post(book.add);

  app.route('/api/search/').get(book.findBy);

  app.route('/api/books/:id').get(book.find).put(book.update).delete(book.remove);

};









// var express = require('express'),
//     mongoose = require('mongoose'),
//     passport = require('passport'),
//     multer = require('multer'),
//     bodyParser = require('body-parser'),
//     fs = require('fs'),
//     AWS = require('aws-sdk');

// var users = require('../controllers/user');

//   // AWS

//   var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
//   var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
//   var S3_BUCKET = process.env.S3_BUCKET;

//   AWS.config.update({
//     accessKeyId: AWS_ACCESS_KEY,
//     secretAccessKey: AWS_SECRET_KEY
//   });

//   var s3 = new AWS.S3({params: {Bucket: S3_BUCKET }});



//   function uploadToS3(file, destFileName, callback) {
//     s3
//         .upload({
//             ACL: 'public-read',
//             Body: fs.createReadStream(file.path),
//             Key: destFileName.toString()
//         })
//         .send(callback);
//   }



// //Models
// var BookModel = require('mongoose').model('Book');
// var UserModel = require('mongoose').model('User');


// // Routers

// router = express.Router();

// router.route('/')
//   .get(function(req, res){
//     res.send( 'Library API is running' );
//   });

// // router.route('/cover')
// //   .post(function(req, res) {
// //     return res.send({ path: "img/uploads/" + req.files.coverImageUpload.name });
// //   });

// router.route('/coverUpload')
//   .post(multer({limits: {fileSize:10*1024*1024}}), function (req, res) {

//     console.log('req.files: ', req.files);
//     console.log('req.files.coverImageUpload: ', req.files.coverImageUpload);

//     if (!req.files || !req.files.coverImageUpload) {
//       return res.status(403).send('expect 1 file upload named coverImageUpload').end();
//     }
//     var coverImageUpload = req.files.coverImageUpload;

//     // this is mainly for user friendliness. this field can be freely tampered by attacker.
//     if (!/^image\/(jpe?g|png|gif)$/i.test(coverImageUpload.mimetype)) {
//       return res.status(403).send('expect image file').end();
//     }

//     uploadToS3(coverImageUpload, coverImageUpload.name, function (err, data) {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('failed to upload to s3').end();
//       }
//       // return res.send({ path: "img/uploads/" + req.files.coverImageUpload.name });
//       console.log('data: ', data);
//       res.status(200)
//         .send({ url: data.Location, ETag: data.ETag })
//         .end();
//     });
//   });


// router.route('/books')
//   .get(function(req, res) {
//     // console.log('get books req: ----------------------', req);
//     return BookModel.find( { userId: req.user._id }, function( err, books ) {
//        if (!err) {
//          return res.send( books );
//        } else {
//          return console.log( err );
//        }
//     });
//   })
//   .post(function(req, res) {
//     var book = new BookModel({
//       coverImage: req.body.coverImage,
//       title: req.body.title,
//       author: req.body.author,
//       dateCompleted: req.body.dateCompleted,
//       created: req.body.created,
//       stars: null,
//       keywords: req.body.keywords,
//       comment: '',
//       userId: req.user._id
//     });
//     book.save( function( err ) {
//       if (!err) {
//         return console.log ( 'created' );
//       } else {
//         return console.log ( err );
//       }
//     });
//     return res.send( book );
//   });

// router.route('/books/:id')
//   .get(function(req, res) {
//     return BookModel.find( { userId: req.user._id, _id: req.params.id }, function( err, book ) {
//       if (!err) {
//         return res.send( book );
//       } else {
//         return console.log( err );
//       }
//     });
//   })
//   .put(function(req, res) {
//     console.log('Updating book ' + req.body.title );
//     return BookModel.findById( req.params.id, function( err, book ) {
//       book.title = req.body.title;
//       book.author = req.body.author;
//       book.dateCompleted = req.body.dateCompleted;
//       book.stars = req.body.stars;
//       book.keywords = req.body.keywords;
//       book.comment = req.body.comment;
//       return book.save( function( err ) {
//         if (!err) {
//           console.log( 'book updated' );
//         } else {
//            console.log( err );
//         }
//         return res.send( book );
//       });
//     });
//   })
//   .delete(function(req, res) {
//     console.log( 'Deleting book with id: ' + req.params.id );
//     return BookModel.findById( req.params.id, function( err, book ) {
//       return book.remove( function( err ) {
//         if (!err) {
//          console.log( 'Book removed' );
//         } else {
//          console.log( err );
//         }
//       });
//     });
//   });


// module.exports = router;


