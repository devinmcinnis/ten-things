var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  text: String,
  created_at: Date
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
