var express = require('express');
var router = express.Router();
var db=require("./db");

/* GET home page. */
router.get('/kurul', function(req, res, next) {
  res.render('kurul', { title: 'Express' });
});
//Kurula ekleme
router.post('/addKurul', function(req, res, next) {
    //kaydedilecek nesne
    var post={
      kno:req.body.kno,
      unvan:req.body.unvan,
      ad:req.body.ad,
      soyad:req.body.soyad,
      kurulcol:req.body.kur,
    }
    //veri tabanı kayıt
    let sqlstr='INSERT INTO kurul SET ?';
    let query=db.query(sqlstr,post,function(err,result){
      if(err){res.send("HATA!!!"+err); throw err;}
      else{console.log("SONUC:::"+result); 
          res.redirect('/');}
    });
});
//delete kurul
router.post('/delKurul', function(req, res, next) {
  var post=req.body.kno2;
  let sqlstr='DELETE FROM kurul WHERE kno=?';
  let query=db.query(sqlstr,post,function(err,result){
    if(err){res.send("HATA!!!"+err); throw err;}
    else{console.log("SONUC:::"+result); 
        res.redirect('/');}
  });
});

module.exports = router;
