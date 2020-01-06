var express = require('express');
var router = express.Router();
var db=require('./db');
var request=require('request');
/* Öğrenci Kayıt */
router.post('/ogrkayit', function(req, res, next) {
  //captcha
  if(req.body.captcha==undefined || req.body.captcha=='' || req.body.captcha==null ){
    res.send("captcha ");
  }
  const secretKey='6LdDcokUAAAAAJYySfOTxmjc4LkhA3P_wAY1g4kI';
  const verifyUrl='https://www.google.com/recaptcha/api/siteverify?secret='+
  secretKey+'&response='+req.body.captcha;//+'&remoteip='+req.connection.remoteAddress;
  //verifyurl request
  request(verifyUrl,function(err,response,body){
      body=JSON.parse(body);
      if(body.success!==undefined && !body.success){
        res.send("captcha error");
      }else{
        //kaydedilecek nesne
        var post={
          stuNum:req.body.stuNum,
          stuName:req.body.stuName,
          stuSurName:req.body.stuSurName,
          cur:req.body.cur,
          lastUpdate:new Date(),
        }
        //veri tabanı kayıt
        let sqlstr='INSERT INTO students SET ?';
        let query=db.query(sqlstr,post,function(err,result){
          if(err){res.send("HATA!!!"+err); throw err;}
          else{console.log("SONUC:::"+result); 
              res.json({msg:"success"});}
              //res.sendFile("page.html");
              //res.redirect('/');}
        });
      }
  
  });
});

router.get('/stuEntry', function(req, res, next) {
  res.render('stuEntry', { title: 'Express' });
});

module.exports = router;