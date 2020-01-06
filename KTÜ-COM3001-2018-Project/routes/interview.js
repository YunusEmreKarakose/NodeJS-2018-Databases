var express = require('express');
var router = express.Router();
var db=require('./db');

// Mülakat
/* GET mülakat sayfası. */
router.get('/interview', function(req, res, next) {
    res.render('interview', { title: 'Express' });
  });
//Mülakat kaydıOluşturma
router.post('/mkayit', function(req, res, next) {
    var post={
        stuNum:req.body.stuNum,
        internDate:req.body.internDate,//intern datadaki sDate ile aynı değer
        devam:req.body.devam,
        cabacalisma:req.body.cabacalisma,
        ivyapma:req.body.ivyapma,
        amiredavranis:req.body.amiredavranis,
        isarkdavranis:req.body.isarkdavranis,
        proje:req.body.proje,
        duzen:req.body.duzen,
        sunum:req.body.sunum,
        icerik:req.body.icerik,
        mulakat:req.body.mulakat,
    }
    //mulakat sonuc notu
    var sonuc=hesapla(post);
    sonuc=sonuc/100;//kabul edilecek gün oranı
    //Kabul edilen günün sonuc(hesaplanan oran) ve yapılan günün çarpımıyla güncellenmesi
    let sqlstr2='UPDATE interndata SET dayAcc=dayDone*? WHERE stuNum=? AND sDate=?';
    let query2=db.query(sqlstr2,[sonuc,post.stuNum,post.internDate],function(err,result){
        if(err){res.send("HATA!!!"+err); throw err;}
        else{
            
            }
    });
    //iki aynı sorgu ile güncellenmiyor?????
    //Veri tabanındaki değerlendiridimi? değişkeninin değerlendirildiye setlenmesi
    let sqlstr3='UPDATE interndata SET isRate="1" WHERE stuNum=? AND sDate=?';
    let query3=db.query(sqlstr3,[post.stuNum,post.internDate],function(err,result){
        if(err){res.send("HATA!!!"+err); throw err;}
        else{
            
            }
    });
    
    //veri tabanı kayıt
    let sqlstr='INSERT INTO interview SET ?';
    let query=db.query(sqlstr,post,function(err,result){
        if(err){res.send("HATA!!!"+err); throw err;}
        else{console.log("SONUC:::"+result); 
            res.redirect('/');}
    });
});
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
