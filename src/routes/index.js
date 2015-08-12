'use strict';

var Config = require('../config/config.js')();
var Count = require('../models/count.js');

var Routes = function(app) {
  app.get('/', function(req, res) {
    res.render('index.jade', {
      title: Config.title + 'Home',
      count: Count.get(),
      something: process.env.THING,
      thing: process.env.THING || "Hmm, there doesn't seem to be anything to talk about today. Check back tomorrow!"
    });
  });

  require('./count.js')(app);
};

module.exports = Routes;
