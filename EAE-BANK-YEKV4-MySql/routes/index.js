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
  var data = {
    hata: false,
    kayitSuccess: null
  };
  var kadi=req.body.kadi;
  var sifre=req.body.sifre;
  let sql=`SELECT * FROM members WHERE username = "${kadi}"`;
    let query=db.query(sql,function(err,rows,result){
        if(err){res.render('page-login', { viewData: data }); throw err;}
        else{
          if(sifre==rows[0].password){            
            req.session.account = rows;
            res.redirect('/anasayfa'); 
             
          }else{            
            //console.log(rows);
            hata=true;
            res.send({ viewData: data });
              }
          }
        });
    });

// Session öldürme işlemi ve oturumu sonlandırma
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});


module.exports = router;
