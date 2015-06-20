var config = require('./config'),
    express = require('express'),
    ejs = require('ejs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    bcrypt = require('bcrypt-nodejs'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session');

module.exports = function() {

  
  var app = express();


  ejs.delimiter = '$';

  // parses request body and populates request.body
  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( bodyParser.json() );



  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET
  }));

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());


    // app.use( multer({ dest: __dirname + '../../public/img/uploads/' }) );

//   function get_signed_request(file){
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "/upload?file_name="+file.name+"&file_type="+file.type);
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState === 4){
//             if(xhr.status === 200){
//                 var response = JSON.parse(xhr.responseText);
//                 upload_file(file, response.signed_request, response.url);
//             }
//             else{
//                 alert("Could not get signed URL.");
//             }
//         }
//     };
//     xhr.send();
// }

  

  // app.get('/upload', function (req, res) {
  //   console.log( 'get upload:  ', req);
  //   console.log('-----------------------');

  //   aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  //   var s3 = new aws.S3();
  //   var s3_params = {
  //       Bucket: S3_BUCKET,
  //       Key: req.query.file_name,
  //       Expires: 60,
  //       ContentType: req.query.file_type,
  //       ACL: 'public-read'
  //   };
  //   s3.getSignedUrl('putObject', s3_params, function(err, data){
  //       if(err){
  //           console.log(err);
  //       }
  //       else{
  //           var return_data = {
  //               signed_request: data,
  //               url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
  //           };
  //           res.write(JSON.stringify(return_data));
  //           res.end();
  //       }
  //   });

    // res.status(200)
    // .send('<form method="POST" enctype="multipart/form-data">'
    //   + '<input type="file" name="coverImageUpload"/><input type="submit"/>'
    //   + '</form>')
    // .end();
  // });

  // router.route('/cover')
  // .post(function(req, res) {
  //   return res.send({ path: "img/uploads/" + req.files.coverImageUpload.name });
  // });
 
  // app.post('/upload', multer({limits: {fileSize:10*1024*1024}}), function (req, res) {

  //   console.log('req.files: ', req.files);
  //   console.log('req.files.coverImageUpload: ', req.files.coverImageUpload);

  //   if (!req.files || !req.files.coverImageUpload) {
  //     return res.status(403).send('expect 1 file upload named coverImageUpload').end();
  //   }
  //   var coverImageUpload = req.files.coverImageUpload;

  //   // this is mainly for user friendliness. this field can be freely tampered by attacker.
  //   if (!/^image\/(jpe?g|png|gif)$/i.test(coverImageUpload.mimetype)) {
  //     return res.status(403).send('expect image file').end();
  //   }

  //   uploadToS3(coverImageUpload, coverImageUpload.name, function (err, data) {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).send('failed to upload to s3').end();
  //     }
  //     // return res.send({ path: "img/uploads/" + req.files.coverImageUpload.name });
  //     console.log('data: ', data);
  //     res.status(200)
  //     .send({ url: data.Location, ETag: data.ETag })
  //     .end();
  //   });
  // });

  


  //routes
  

  require('../app/routes/index.js')(app);
  require('../app/routes/users.js')(app);
  // var books = require('../app/routes/book');
  // app.use( '/api', books );
  require('../app/routes/book.js')(app);

  app.use(express.static( path.join( __dirname, '../public') ) );

  return app;

};