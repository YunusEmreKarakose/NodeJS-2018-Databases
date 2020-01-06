var express = require('express');
var router = express.Router();
var db=require('./db');
var mysql=require('mysql');

/* Veri tabanı görüntüleme */

router.get('/get', function(req, res, next) {
    res.render('get', { title: 'Express' });
  });
//Öğrenci no ile öğrenci bilgileri sorgulama
router.post('/getOgr', function(req, res, next) {
var stuNUm=req.body.stuNum1;
let sqlstr="SELECT * FROM students WHERE stuNum="+mysql.escape(stuNUm);
    let query=db.query(sqlstr,function(err,result){
        if(err){res.send("HATA!!!"+err); throw err;}
        else{
            var table='';
            var i=0;
            result.forEach(element => {
              table +='<tr><td>'+ result[i].stuNum  +'</td><td>'+ result[i].stuName +'</td><td>'+result[i].stuSurName+'</td><td>'+ result[i].cur +'</td></tr>';
              i++;
            });
            table ='<table border="1"></th><th>Öğrenci No</th><th>Adı</th><th>Soyadı</th><th>Öğretim</th></tr>'+ table +'</table>';
            res.send(table);
    }});
  
});

//Ogr no ile ogrencinin yapmış olduğu stajlar
router.post('/getOgr2', function(req, res, next) {
    var stuNUm=req.body.stuNum2;
    let sqlstr="SELECT * FROM interndata WHERE stuNum="+mysql.escape(stuNUm);
        let query=db.query(sqlstr,function(err,result){
            if(err){res.send("HATA!!!"+err); throw err;}
            else{
                var table='';
                var i=0;
                result.forEach(element => {
                  table +='<tr><td>'+ result[i].stuNum  +'</td><td>'+ result[i].class +'</td><td>'+result[i].corp+'</td><td>'+ 
                  result[i].city +'</td><td>'+result[i].sDate+'</td><td>'+result[i].fDate+'</td><td>'+result[i].dayDone+
                  '</td><td>'+result[i].dayAcc+'</td><td>'+result[i].sub+'</td><td>'+result[i].school+'</td><td>'+
                  result[i].isRate+'</td><td>'+result[i].iDate+'</td><td>'+result[i].kurul+'</td></tr>';
                  i++;
                });
                table ='<table border="1"></th><th>Öğrenci No</th><th>Sınıf</th><th>Kurum</th><th>Şehir</th><th>Başlama Tarihi</th><th>Bitiş Tarihi</th><th>Yapılan Gün</th><th>Kabul Edilen Gün</th><th>Konu</th><th>Okul</th><th>Değerlendirildimi?</th><th>Mülakat Tarihi</th><th>Kurul</th></tr>'+ table +'</table>';
                res.send(table);}
        });
});
//ogr no ve baslama tarihi ile stajıın mülakat puanlarını görme
router.post('/getOgr3', function(req, res, next) {
    var stuNum=req.body.stuNum3;
    var bDate=req.body.bDate;
    //tablolar ogr no ve stajın başlama tarihi ile bağlı
    let sqlstr='SELECT * FROM interview WHERE stuNum=? AND internDate=?';
        let query=db.query(sqlstr,[stuNum,bDate],function(err,result){
            if(err){res.send("HATA!!!"+err); throw err;}
            else{
                //var msonuc=hesapla(result[0]);
                
                var table='';
                var i=0;
                result.forEach(element => {
                  table +='<tr><td>'+ result[i].stuNum  +'</td><td>'+ result[i].internDate +'</td><td>'+result[i].devam+'</td><td>'+ 
                  result[i].cabacalisma +'</td><td>'+result[i].ivyapma+'</td><td>'+result[i].amiredavranis+'</td><td>'+result[i].isarkdavranis+
                  '</td><td>'+result[i].proje+'</td><td>'+result[i].duzen+'</td><td>'+result[i].sunum+'</td><td>'+
                  result[i].icerik+'</td><td>'+result[i].mulakat+'</td><td>'+hesapla(result[i])+'</td></tr>';
                  i++;
                });
                table ='<table border="1"></th><th>Öğrenci No</th><th>Başlama Tarihi</th><th>Devam</th><th>Çaba ve Çalışma</th><th>İşiVaktindeYapma</th><th>AmireKarşıDavranış</th><th>İşArkadasşlarına Davranış</th><th>Proje</th><th>Duzen</th><th>Sunum</th><th>İçerik</th><th>Mülakat</th><th>Sonuç Notu</th></tr>'+ table +'</table>';
                res.send(table);}
        });
});
//kabul edilen günü 57den fazla olanları listele
router.get('/getDone', function(req, res, next) {
    let sqlstr="SELECT stuNum,SUM(dayAcc) AS da,SUM(dayDone) as dd FROM interndata WHERE isRate='1' GROUP BY stuNum";
        let query=db.query(sqlstr,function(err,result){
            if(err){res.send("HATA!!!"+err); throw err;}
            else{ 
                var table='';
                var i=0;
                result.forEach(element => {
                    if(result[i].da>=57){
                        table +='<tr><td>'+ result[i].stuNum  +'</td><td>'+ result[i].da +'</td><td>'+result[i].dd+'</td></tr>';
                    }
                  i++;
                });
                table ='<table border="1"></th><th>Öğrenci No</th><th>Kabul Edilen Gün</th><th>Yapılan Gün</th></tr>'+ table +'</table>';
                res.send(table);}
        });
});
//şehire göre staj basarı oranı
router.get('/getCitySuccess', function(req, res, next) {
    let sqlstr="SELECT city, COUNT(city) AS sayi,SUM(dayDone) AS dd,SUM(dayAcc) AS da FROM interndata WHERE isRate='1' GROUP BY city";
        let query=db.query(sqlstr,function(err,result){
            if(err){res.send("HATA!!!"+err); throw err;}
            else{
                var table='';
                var i=0;
                result.forEach(element => {
                        var oran=(result[i].da/result[i].dd)*100;
                        table +='<tr><td>'+ result[i].city  +'</td><td>'+ result[i].da +'</td><td>'+result[i].dd+'</td><td>'+"%"+oran.toFixed(2)+'</td></tr>';
                  i++;
                });
                table ='<table border="1"></th><th>Şehir</th><th>Kabul Edilen Gün</th><th>Yapılan Gün</th><th>Başarı Oranı</th></tr>'+ table +'</table>';
                res.send(table);}   
        });
});
//konuya göre staj basarı oranı
router.get('/getSubjectSuccess', function(req, res, next) {
    let sqlstr="SELECT sub, COUNT(sub) AS sayi,SUM(dayDone) AS dd,SUM(dayAcc) AS da FROM interndata WHERE isRate='1' GROUP BY sub";
        let query=db.query(sqlstr,function(err,result){
            if(err){res.send("HATA!!!"+err); throw err;}
            else{
                var table='';
                var i=0;
                result.forEach(element => {
                        var oran=(result[i].da/result[i].dd)*100;
                        table +='<tr><td>'+ result[i].sub  +'</td><td>'+ result[i].da +'</td><td>'+result[i].dd+'</td><td>'+"%"+oran.toFixed(2)+'</td></tr>';
                  i++;
                });
                table ='<table border="1"></th><th>Konu</th><th>Kabul Edilen Gün</th><th>Yapılan Gün</th><th>Başarı Oranı</th></tr>'+ table +'</table>';
                res.send(table);}   
        });

});
//veri tabanındaki var olan şirketler
router.get('/corps', function(req, res, next) {
    
    let sqlstr="SELECT (corp),corp FROM interndata GROUP BY corp";
        let query=db.query(sqlstr,function(err,result){
            if(err){res.send("HATA!!!"+err); throw err;}
            else{
                res.send(result);}
        });
  }); 

//"SELECT city,dayDone, COUNT(city) AS sayi FROM internData WHERE isRate='1' GROUP BY city"
   //'SELECT city,dayDone,dayACC FROM interndata WHERE isRate="1"';             
  //"SELECT (city),city FROM interndata GROUP BY city"  veri tabanındaki şehirleri gösteriyor

//Mülakat sonuc puanı hesaplama
function hesapla(post){
    /*
    Devam/CabaCalısma/İsiVaktindeYapma/AmireDavranis/İsArkDavranıs (0-5)%4
    Proje/İcerik (0-100) %15
    Düzen/Sunum (0-100) %5
    Mulakat(0-100) %40
    */
    //((pd+pcc+piv+pad+pid)*80)/100 düzgün çalışmıyor
    var sonuc=(post.devam*80)/100+(post.cabacalisma*80)/100+(post.ivyapma*80)/100+(post.amiredavranis*80)/100+(post.isarkdavranis*80)/100+
    (post.proje*15)/100+(post.icerik*15)/100+
    (post.duzen*5)/100+(post.sunum*5)/100+
    (post.mulakat*40)/100;
    return sonuc;
}
module.exports = router;
