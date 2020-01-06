//kayit işlemleri
var express = require('express');
var router = express.Router();
var Member=require("../models/Members.js");
var fonk = require("./uretimZaman.js");
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
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
//var seed=req.session.account[0].seed;
function uretimKaynak(data,seed,milk,egg,honey,aydi) {  
      //inek
        var milkU,eggU,honeyU,yeniYem;
        yeniYem=seed;
        if (data.cow == null) {

        } else {
          for (var j = 0; j <data.cow.length; j++) {
              var btime = new Date(data.cow[j].cal);
              var now = new Date();
              var dif = fonk.diffMin(now, btime);
              if (yeniYem >= fonk.eatSeedChicken(dif)) {
                milkU = parseInt(fonk.cowMilk(dif))+parseInt(milk);
                yeniYem-=fonk.eatSeedCow(dif);
                data.cow[j].cal=new Date();              
              }else{/*yem yok*/}
          }
        }
      
      
        if (data.chicken == null) {
          //tavuk yok
        } else {
          for (var j = 0; j <data.chicken.length; j++) {
           
            var btime = new Date(data.chicken[j].cal);
            var now = new Date();
            var dif = fonk.diffMin(now, btime);
            if (yeniYem >= fonk.eatSeedChicken(dif)) {
              yeniYem-= fonk.eatSeedChicken(dif);
              var eggU = parseInt(fonk.chickenEgg(dif))+parseInt(egg);
              data.chicken[j].cal=new Date();              
            }else{/*yem yok*/}
          }
        }
      
      
        if (data.bee == null) {

        } else {
          for (var j = 0; j <data.bee.length; j++) {
              var btime = new Date(data.bee[j].cal);
              var now = new Date();
              var dif = fonk.diffMin(now, btime);
              if (yeniYem >= fonk.eatSeedBee(dif)) { 
                yeniYem-=fonk.eatSeedBee(dif);                
                var honeyU = parseInt(fonk.cowMilk(dif))+parseInt(honey);
                data.bee[j].cal=new Date();              
              }else{/*yem yok*/}
          }
        }
        let sql=`UPDATE members SET seed='${yeniYem}', milk='${milkU}',egg='${eggU}',honey='${honeyU}' WHERE id = ${aydi}`;
        let query=db.query(sql,function(err,result){
            if(err){    console.log("update hata"); throw err;}
            else{console.log(result);}
        });
      
    return data;
}

function olum(data) {
   //inek
        {
          if (data.cow == null) {
            //alert("inek yok");  console.log("inek yok");
          } else {
              var boy= data.cow.length;
            for (var j = 0; j <boy; j++) {

              var btime = new Date(data.cow[j].death);
              var now = new Date();
              var dif = fonk.diffMin(now, btime);
              if (dif >= 30) {
                var del = data.cow.splice(j, 1);
                j--;
                boy--;
              }
            }
          }
        }
    //tavuk
    {
      if (data.chicken == null) {
        //alert("inek yok");  console.log("inek yok");
      } else {
          var boy= data.chicken.length;
        for (var j = 0; j <boy; j++) {

          var btime = new Date(data.chicken[j].death);
          var now = new Date();
          var dif = fonk.diffMin(now, btime);
          if (dif >= 30) {
            var del = data.chicken.splice(j, 1);
            j--;
            boy--;
          }
        }
      }
    }
    //arı
    {
      if (data.bee == null) {
        //alert("inek yok");  console.log("inek yok");
      } else {
          var boy= data.bee.length;
        for (var j = 0; j <boy; j++) {

          var btime = new Date(data.bee[j].death);
          var now = new Date();
          var dif = fonk.diffMin(now, btime);
          if (dif >= 30) {
            var del = data.bee.splice(j, 1);
            j--;
            boy--;
          }
        }
      }
    }    
  return data;
}

// Ana Sayfa Yönlendirmesi
router.get('/',fonk.requireAuthentication, function (req, res, next) {
  var data=JSON.parse(req.session.account[0].history);
  var milk=req.session.account[0].milk;
  var egg=req.session.account[0].egg;
  var honey=req.session.account[0].honey;
  var seed=req.session.account[0].seed;
  var aydi=req.session.account[0].id;
  var tamp=uretimKaynak(data,seed,milk,egg,honey,aydi);
  var tamp2=olum(tamp);  
  var historydb=JSON.stringify(tamp2);

  let sql=`UPDATE members SET history='${historydb}' WHERE id = ${aydi}`;
  let query=db.query(sql,function(err,result){
      if(err){    console.log("update hata"); throw err;}
      else{console.log(result);}
  });
   res.render('index');
});
module.exports = router;