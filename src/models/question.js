var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var questionSchema = new Schema({
  title: String,
  created_at: Date,
  answers: [{
    text: String,
    created_at: Date
  }]
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
