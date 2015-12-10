//GPIO
var Gpio = require('onoff').Gpio,
motor1 = new Gpio(11, 'out'),
motor1Go = new Gpio(10, 'out'),
motor1Back = new Gpio(9, 'out');

motor2 = new Gpio(25, 'out'),
motor2Go = new Gpio(24, 'out'),
motor2Back = new Gpio(23, 'out');

//var piblaster = require('pi-blaster.js');

//var currentPulse = 0;
//var up = true;
//function update() {
//setTimeout(function(){
//if(up){
   //if(currentPulse <= 1) currentPulse += .1;
   //else up = false;
////console.error('up ' + currentPulse);
//} else {
   //if(currentPulse >= 0) currentPulse -= .1;
   //else up = true;
 ////  console.error('down  ' + currentPulse);
//}
//piblaster.setPwm(17, currentPulse);
//update();
//},100);
//}
//update();
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
  motor1.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Go.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Back.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Go.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Back.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  res.json({go: true});
});

app.get('/back', function (req, res) {
  motor1.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Go.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Back.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Go.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Back.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  res.json({back: true});
});

app.get('/left', function (req, res) {
  motor1.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Go.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Back.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Go.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Back.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  res.json({left: true});
});

app.get('/right', function (req, res) {
  motor1.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Go.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor1Back.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Go.write(1, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2Back.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  res.json({right: true});
});

app.get('/stop', function (req, res) {
  motor1.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
  motor2.write(0, function(e){if(e != null)console.error(JSON.stringify(e))});
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

function exit() {
  motor1.unexport();
  motor1Go.unexport();
  motor1Back.unexport();
  process.exit();
}

process.on('SIGINT', exit);

module.exports = app;
