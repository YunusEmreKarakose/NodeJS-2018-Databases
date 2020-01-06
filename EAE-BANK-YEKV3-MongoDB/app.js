var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var session=require('express-session');

var indexRouter = require('./routes/index');
var kayit=require('./routes/kayit.js');
var para=require('./routes/para.js');
var satinAl=require('./routes/satinal.js');
var anaSayfa=require('./routes/mainpage.js');
var sat=require('./routes/satis.js');

var app = express();

mongoose.connect("mongodb://localhost:27017/eae",{ useNewUrlParser: true });

mongoose.connection.on("open", function () {
  console.log("bağlantı tamam");
});
mongoose.connection.on("error", function (err) {
  console.log("Hata :" + err);
});
app.use(session({
  secret:'omer5000',
  resave:false,
  saveUninitialized:false
}));
app.use(function(req,res,next){
  res.locals.account=req.session.account;
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/',kayit);
app.use('/para',para);
app.use('/satinAl',satinAl);
app.use('/anasayfa',anaSayfa);
app.use('/sat',sat);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
