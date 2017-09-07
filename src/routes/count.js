'use strict';

var Config = require('../config/config.js')();
var Count = require('../models/count.js');
var fs = require('fs');

module.exports = function(app) {
  app.get('/things', function(req, res) {
    fs.readFile('/tmp/things.txt', 'utf8', function(err, json) {
      if (err) {
        console.log('Bad error on read', err);

        return res.json({
          things: []
        });
      }

      var things = JSON.parse(json).list;

      return res.json({
        things: things
      });
    });
  });

  app.post('/things', function(req, res) {
    fs.readFile('/tmp/things.txt', 'utf8', function(err, json) {
      if (err) {
        console.log('Bad error on read', err);

        return res.json({
          things: []
        });
      }

      var things = JSON.parse(json).list;

      for (var thing in req.body) {
        if (req.body[thing]) {
          things.push(req.body[thing]);
        }
      }

      var newList = {
        list: things
      };

      var data = JSON.stringify(newList);

      fs.writeFile('/tmp/things.txt', data, function(err) {
        if (err) {
          console.log('Bad error on write', err);
        }

        return res.json({
          things: things
        });
      });
    });
  });

  app.post('/count/increment', function(req, res) {
    res.json({
      newCount: Count.increment()
    });
  });
};
