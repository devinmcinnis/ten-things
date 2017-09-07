'use strict';

var R = require('ramda');
var badWords = require('./badWords');
var wordfilter = require('wordfilter')
wordfilter.addWords(badWords);
var Question = require('./../models/question');
// var Answer = require('./../models/answer');

module.exports = function(app) {
  // app.get('/question/:id', function(req, res, next) {
  //   Question
  //     .findById(req.params.id)
  //     .exec(function(err, q) {
  //       res.json(q);
  //     });
  // });

  app.post('/things', function(req, res, next) {
    var things = [];
    var _thing;
    var answer;

    for (var thing in req.body) {
      _thing = req.body[thing];

      if (_thing && !wordfilter.blacklisted(_thing)) {
        answer = {
          text: _thing,
          created_at: new Date()
        };

        things.push(answer);
      }
    }

    Question
      .findById(process.env.QUESTION_ID)
      .exec(function(err, question) {
        question.answers = question.answers.concat(things);

        question.save(function(err, q) {
          var answers = R.pluck('text', q.answers);
          return res.json({ things: answers });
        });
      });
  });
};
