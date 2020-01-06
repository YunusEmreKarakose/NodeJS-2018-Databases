var express = require('express');
var router = express.Router();
var Member=require("../models/Members.js");
var fonk = require("./uretimZaman.js");



// Login Sayfası Yönlendirme
router.get('/', function (req, res, next) {
    
  var data = {
    hata: false,
    kayitSuccess: null
  };
  res.render('page-login', { viewData: data });
});


// Login İşleminin Yapıldığı Post İşlemi
router.post('/', function (req, res, next) {
  var kadi=req.body.kadi;
  var sifre=req.body.sifre;
  Member.findOne({userName:kadi,password:sifre},function(err,data){
    if(err){res.render('page-login', { viewData: data });throw err;}
    else{  
        console.log(data);    
        req.session.account = data;
       
        res.redirect('/anasayfa');
      
      }
  });
});

// Session öldürme işlemi ve oturumu sonlandırma
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});


module.exports = router;
