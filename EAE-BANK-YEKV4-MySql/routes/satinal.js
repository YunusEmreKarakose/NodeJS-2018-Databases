var express = require('express');
var router = express.Router();
var Member=require("../models/Members.js");
var need=require('./uretimZaman.js');
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
// Hayvan Ve Yem Alma Sayfasına Yönlendirme
router.get('/', need.requireAuthentication, function (req, res, next) {
    var data = {
      hata: null
    }
    res.render('hayvan-al', { viewData: data });
  });
//satinalma işlemleri
router.post('/',need.requireAuthentication,function(req, res, next) {
    var item=req.body.islem;
    var aydi=req.session.account[0].id;
    var vdata = {
        hata: false
      };

    switch(item){
        case"cow":
            if(req.session.account[0].coin>=50){
                var dizi=JSON.parse(req.session.account[0].history);                
                var yeniPara=parseInt(req.session.account[0].coin)-50;
                dizi.cow.push({cal: new Date(),death:new Date()});
               // var aydi=req.session.account[0].id;
                var tamp=JSON.stringify(dizi);
                let sql=`UPDATE members SET history='${tamp}',coin='${yeniPara}' WHERE id = ${aydi}`;
                let query=db.query(sql,function(err,result){
                    if(err){    console.log("update hata"); throw err;}
                    else{console.log(result);res.send('update oldu');}
            
                });
            }else{vdata.hata = true; }
            break;
        case"chicken":
        if(req.session.account[0].coin>=20){
            var dizi=JSON.parse(req.session.account[0].history);                
            var yeniPara=parseInt(req.session.account[0].coin)-20;
            dizi.chicken.push({cal: new Date(),death:new Date()});
           // var aydi=req.session.account[0].id;
            var tamp=JSON.stringify(dizi);
            let sql=`UPDATE members SET history='${tamp}',coin='${yeniPara}' WHERE id = ${aydi}`;
            let query=db.query(sql,function(err,result){
                if(err){    console.log("update hata"); throw err;}
                else{console.log(result);res.send('update oldu');}
        
            });
        }else{vdata.hata = true; }
            break;
        case"bee":
        if(req.session.account[0].coin>=10){
            var dizi=JSON.parse(req.session.account[0].history);                
            var yeniPara=parseInt(req.session.account[0].coin)-10;
            dizi.bee.push({cal: new Date(),death:new Date()});
           // var aydi=req.session.account[0].id;
            var tamp=JSON.stringify(dizi);
            let sql=`UPDATE members SET history='${tamp}',coin='${yeniPara}' WHERE id = ${aydi}`;
            let query=db.query(sql,function(err,result){
                if(err){    console.log("update hata"); throw err;}
                else{console.log(result);res.send('update oldu');}
        
            });
        }else{vdata.hata = true; }
            break;
        case"seed":
        if(req.session.account[0].coin>=10){             
            var yeniPara=parseInt(req.session.account[0].coin)-10;
            var yeniseed=req.session.account[0].seed+100;;
            var tamp=JSON.stringify(dizi);
            let sql=`UPDATE members SET seed='${yeniseed}',coin='${yeniPara}' WHERE id = ${aydi}`;
            let query=db.query(sql,function(err,result){
                if(err){    console.log("update hata"); throw err;}
                else{console.log(result);res.send('update oldu');}
        
            });
        }else{vdata.hata = true; }
        break;                    
        default:
            break;
    }
    //res.render('index', { title: 'Express' });
  });

module.exports = router;