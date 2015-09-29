//GPIO
var Gpio = require('onoff').Gpio,
led = new Gpio(14, 'out');



var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/go', function (req, res) {
  led.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  res.json({go: true});
});

app.get('/back', function (req, res) {
  res.json({back: true});
});

app.get('/left', function (req, res) {
  res.json({left: true});
});

app.get('/right', function (req, res) {
  res.json({right: true});
});

app.get('/stop', function (req, res) {
  led.write(0);
  res.json({stop: true});
});

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
