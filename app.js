var newrelic = require('newrelic');
var fs = require('fs');
var compress = require('compression');
var express = require('express');
var helmet = require('helmet');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./src/config/config.js')();

var app = express();
var env = process.env.NODE_ENV || 'development';
var viewsDir = (env === 'development' ? 'views' : 'built/views');

// Enable gzip
app.use(compress());

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, viewsDir));

app.set('port', process.env.PORT || 3000);
app.use(favicon());
app.use(env === 'development' ? logger('dev') : logger('default'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// x-frame-options security
app.use(helmet.frameguard('deny'));

/**
 * Force https

var forceSsl = function(app) {
  app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, 'https://' + req.get('Host') + req.url);
    } else {
      next();
    }
  });
};

if (env === 'staging' || env === 'production') {
  forceSsl(app);
}

*/

require('./src/routes')(app, newrelic);

/// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// Error handlers
app.use(function (err, req, res, next) {
  console.error('url: %s, stack: %s', req.url ,err.stack);
  next(err);
});

// Development error handler
// Will print stacktrace
if (env === 'development' || env === 'staging') {
  console.log('using dev/staging error handler');
  app.use(function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    res.render('error', {
      error: err,
      status: status
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  var status = err.status || 500;
  res.status(status);
  res.render('error', {
    error: {},
    status: status
  });
});

// Setup writable file on load
var tempFile = {
  list: []
};

fs.writeFile('/tmp/things.txt', JSON.stringify(tempFile), function(err) {
  if (err) return console.log(err);
});

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
  console.log('Config:', config);
});

