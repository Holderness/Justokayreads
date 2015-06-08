var mongoose = require('mongoose');


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

module.exports = mongoose.model( 'Book', Book );