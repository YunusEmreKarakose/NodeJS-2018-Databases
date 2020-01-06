const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session=require('express-session');
const mysql=require('mysql');
//routes
const indexRouter = require('./routes/index');
const kayit=require('./routes/kayit.js');
const para=require('./routes/para.js');
const satinAl=require('./routes/satinal.js');
const anaSayfa=require('./routes/mainpage.js');
const sat=require('./routes/satis.js');
/*
//bağlantıoluştur
const db=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'eaebank'
});
//bağlanma
db.connect(function(err){
  if(err){    console.log("db connect hata"); throw err;}
  else{console.log("mysql baglandı");}
});*/
const app = express();

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