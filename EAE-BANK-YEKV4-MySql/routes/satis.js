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
//ürün satmasayfası
router.get('/', need.requireAuthentication, function (req, res, next) {
    res.render('blank-page');
  });
//işlemleri
router.post('/',need.requireAuthentication,function(req, res, next) {
    var item=req.body.islem;
    var aydi=req.session.account[0].id;
    switch(item){
        case"milk":
            if(req.session.account[0].milk=!null){
                var sut=need.sellMilk(req.session.account[0].milk);
                var yeniPara=req.session.account[0].coin+sut;
                let sql=`UPDATE members SET coin='${yeniPara}',milk='0' WHERE id = ${aydi}`;
                let query=db.query(sql,function(err,result){
                    if(err){    console.log("update hata"); throw err;}
                    else{console.log(result);res.send('update oldu');}
            
                });
            }
            break;
        case"egg":
            if(req.session.account[0].milk=!null){
                var yumurta=need.sellEgg(req.session.account[0].egg);
                var yeniPara=yumurta+req.session.account[0].coin;
                let sql=`UPDATE members SET coin='${yeniPara}',egg='0' WHERE id = ${aydi}`;
                let query=db.query(sql,function(err,result){
                    if(err){    console.log("update hata"); throw err;}
                    else{console.log(result);res.send('update oldu');}
            
                });
            }
            break;
        case"honey":
            if(req.session.account[0].milk=!null){
                var bal=need.sellSeed(req.session.account[0].honey);
                var yeniPara=bal+req.session.account[0].coin;
                let sql=`UPDATE members SET coin='${yeniPara}',honey='0' WHERE id = ${aydi}`;
                let query=db.query(sql,function(err,result){
                    if(err){    console.log("update hata"); throw err;}
                    else{console.log(result);res.send('update oldu');}
            
                });
            }
            break;
        case"seed":
            if(req.session.account[0].milk=!null){
                var yem=need.sellSeed(req.session.account[0].seed);
                var yeniPara=yem+req.session.account[0].coin;
                let sql=`UPDATE members SET coin='${yeniPara}',seed='0' WHERE id = ${aydi}`;
                let query=db.query(sql,function(err,result){
                    if(err){    console.log("update hata"); throw err;}
                    else{console.log(result);res.send('update oldu');}
            
                });
            }
            break;
        default:
                //res.json("item seçilmedi");
            break;
    }
  });
module.exports = router;

