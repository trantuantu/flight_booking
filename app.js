var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connection = require('./connection');

var index = require('./routes/index');
var airports = require('./routes/airports');
var flights = require('./routes/flights');
var passengers = require('./routes/passengers');
var booking = require('./routes/booking');
var tickets = require('./routes/tickets');
var transits = require('./routes/transits');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/airports', airports);
app.use('/booking', booking);
app.use('/flights', flights);
app.use('/passengers', passengers);
app.use('/tickets', tickets);
app.use('/transits', transits);

var server = require('http').createServer(app);
connection.init();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



server.listen(3000);
module.exports = app;