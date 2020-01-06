var express = require('express');
var router = express.Router();
var db=require('./db');
/*
    Staj tablosu
*/
//GET sayfa
router.get('/intern', function(req, res, next) {
  res.render('intern', { title: 'Express' });
});

//Staj bilgileri oluşturma
router.post('/internData', function(req, res, next) {
  //Staj farklı bir okulda iken yapılmışsa kabul edilen gün yapılanın yarısı(DGS)
  var acc;
  var iR=false;
  if(req.body.school=='KTÜ'){
    acc=null;
  }else{
    acc=req.body.dayDone/2;
    iR=true;
  }
  //veri tabanına kayıt edilecek veriler
  var post={
    stuNum:req.body.stuNum,
    class:req.body.class,
    corp:req.body.corp,
    city:req.body.city,
    sDate:req.body.sDate,
    fDate:req.body.fDate,
    dayDone:req.body.dayDone,
    dayAcc:acc,
    sub:req.body.sub,
    school:req.body.school,
    isRate:iR,
    kurul:req.body.kurul,
  } 
  /*
    Ogrenci 2. sinif ise 25 gunden fazla staj yapamaz
    Ogrenci 15 gunden az staj yapamaz
    Konu Arge değilse 40 gunden fazla staj yapılamaz
  */
  if(req.body.dayDone>25 && req.body.class<3){
    res.send("ogrenci 2. sinif 25 gunden fazla staj olamaz");
  }else if(req.body.dayDone<15){
    res.send("15 gunden az staj yapılamaz");
  }else if(req.body.sub!="ARGE"&&req.body.dayDone>40){
    res.send("konusu arge olmayan staj 40 gunden fazla olamaz");
  }else if(req.body.dayDone>60){
    res.send("staj 60 günden fazla olamaz");
  }else{
    //kosullar saglandı veri tabanı kayıt
   let sqlstr='INSERT INTO interndata SET ?';
   let query=db.query(sqlstr,post,function(err,result){
      if(err){res.send("HATA!!!"+err); throw err;}
      else{console.log("SONUC:::"+result); 
         res.redirect('/');}
    });
  } 
});

module.exports = router;
