var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//js dosyaları
var indexRouter = require('./routes/index');
var stuEntry=require('./routes/stuEntry');
var interview=require('./routes/interview');
var intern=require('./routes/intern');
var get=require('./routes/get');
var itime=require('./routes/itime');
var kurul=require('./routes/kurul');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//js dosyalarına ulaşım yolu
app.use('/', indexRouter);
app.use('/', stuEntry);
app.use('/', interview);
app.use('/', intern);
app.use('/',get);
app.use('/',itime);
app.use('/',kurul);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
