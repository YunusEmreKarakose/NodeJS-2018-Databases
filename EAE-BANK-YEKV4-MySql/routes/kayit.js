//kayit işlemleri
var express = require('express');
var router = express.Router();

const mysql=require('mysql');

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
  });

router.post('/login', function(req, res, next) {
    var post={
        name: req.body.ad,
        surname: req.body.soyad,
        username:req.body.kadi,       
        password: req.body.sifre,
        email:req.body.eposta,
      }
    let sql='INSERT INTO members SET ?';
    let query=db.query(sql,post,function(err,result){
        if(err){    console.log("kayıt hata"); throw err;}
        else{console.log(result);res.redirect('/');}
    });
});
module.exports = router;

