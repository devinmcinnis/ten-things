'use strict';

var Config = require('../config/config.js')();
var Count = require('../models/count.js');

var things = [];

module.exports = function(app) {
  app.post('/things', function(req, res) {
    console.log(req.body);

    for (var thing in req.body) {
      if (req.body[thing]) {
        things.push(req.body[thing]);
      }
    }
    console.log('things', things);

    res.json({
      things: things
    });
  });

  app.post('/count/increment', function(req, res) {
    res.json({
      newCount: Count.increment()
    });
  });
};
