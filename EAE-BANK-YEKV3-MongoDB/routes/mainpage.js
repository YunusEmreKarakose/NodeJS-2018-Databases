//kayit işlemleri
var express = require('express');
var router = express.Router();
var Member=require("../models/Members.js");
var fonk = require("./uretimZaman.js");

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

function uretimKaynak(data) {  
    //req.session.accout.resources.cow[i];
      //inek
      {
        if (data.resources.cow == null) {

        } else {
          for (var j = 0; j <data.resources.cow.length; j++) {
              var btime = new Date(data.resources.cow[j].cal);
              var now = new Date();
              var dif = fonk.diffMin(now, btime);
              var milkU = parseInt(fonk.cowMilk(dif))+parseInt(data.resources.milk);
              var yeniYem=data.resources.seed-fonk.eatSeedCow(dif)
              
              if (data.resources.seed >= fonk.eatSeedChicken(dif)) {
                data.resources.seed=yeniYem;
                data.resources.milk=milkU;
                data.resources.cow[j].cal=new Date();              
              }else{/*yem yok*/}
          }
        }
      }
      {
        if (data.resources.chicken == null) {
          //tavuk yok
        } else {
          for (var j = 0; j <data.resources.chicken.length; j++) {
           
            var btime = new Date(data.resources.chicken[j].cal);
            var now = new Date();
            var dif = fonk.diffMin(now, btime);
            var eggU = parseInt(fonk.chickenEgg(dif))+parseInt(data.resources.egg);
            var yeniYem=data.resources.seed-fonk.eatSeedChicken(dif)
              
            if (data.resources.seed >= fonk.eatSeedChicken(dif)) {
              data.resources.seed=yeniYem;
              data.resources.egg=eggU;
              data.resources.chicken[j].cal=new Date();              
            }else{/*yem yok*/}
          }
        }
      }
      {
        if (data.resources.bee == null) {

        } else {
          for (var j = 0; j <data.resources.bee.length; j++) {
            if (data.resources.seed >= 50) {
              var btime = new Date(data.resources.bee[j].cal);
              var now = new Date();
              var dif = fonk.diffMin(now, btime);
              var honeyU = parseInt(fonk.cowMilk(dif))+parseInt(data.resources.honey);
              var yeniYem=data.resources.seed-fonk.eatSeedBee(dif)
              if (data.resources.seed >= fonk.eatSeedBee(dif)) {
                data.resources.seed=yeniYem;
                data.resources.honey=honeyU;
                data.resources.bee[j].cal=new Date();              
              }else{/*yem yok*/}
            }
          }
        }
      }
    return data;
}

function olum(data) {
   //inek
        {
          if (data.resources.cow == null) {
            //alert("inek yok");  console.log("inek yok");
          } else {
              var boy= data.resources.cow.length;
            for (var j = 0; j <boy; j++) {

              var btime = new Date(data.resources.cow[j].death);
              var now = new Date();
              var dif = fonk.diffMin(now, btime);
              if (dif >= 30) {
                var del = data.resources.cow.splice(j, 1);
                j--;
                boy--;
              }
            }
          }
        }
    //tavuk
    {
      if (data.resources.chicken == null) {
        //alert("inek yok");  console.log("inek yok");
      } else {
          var boy= data.resources.chicken.length;
        for (var j = 0; j <boy; j++) {

          var btime = new Date(data.resources.chicken[j].death);
          var now = new Date();
          var dif = fonk.diffMin(now, btime);
          if (dif >= 30) {
            var del = data.resources.chicken.splice(j, 1);
            j--;
            boy--;
          }
        }
      }
    }
    //arı
    {
      if (data.resources.bee == null) {
        //alert("inek yok");  console.log("inek yok");
      } else {
          var boy= data.resources.bee.length;
        for (var j = 0; j <boy; j++) {

          var btime = new Date(data.resources.bee[j].death);
          var now = new Date();
          var dif = fonk.diffMin(now, btime);
          if (dif >= 30) {
            var del = data.resources.bee.splice(j, 1);
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

  var data=req.session.account;
  //res.json(data);
  var tamp=uretimKaynak(data);
  var tamp2=olum(tamp);
  //res.json(tamp);
  var aydi=req.session.account._id;
  Member.findByIdAndUpdate(aydi,
    {
      'resources.milk':tamp2.resources.milk,
      'resources.cow':tamp2.resources.cow,
      'resources.honey':tamp2.resources.honey,
      'resources.bee':tamp2.resources.bee,
      'resources.egg':tamp2.resources.egg,
      'resources.chicken':tamp2.resources.chicken,
      'resources.seed':tamp2.resources.seed
    }
      ,function(err,data){
      if(err){res.send("update hata"); throw err;}
      else{ 
        res.render('index');
        //  res.json(data);
          }        
      });
});
module.exports = router;