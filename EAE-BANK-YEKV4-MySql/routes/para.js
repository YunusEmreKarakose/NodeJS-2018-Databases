//kayit işlemleri
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

router.get('/', need.requireAuthentication, function (req, res, next) {
    var viewData = {
      success: null
    }
    res.render('sat-satinal', { viewData: viewData });
  });

router.post('/paraYukle',need.requireAuthentication,function(req, res, next) {
    var viewData = {
            success: null
          }
    var yeniPara=parseInt(req.session.account[0].coin)+parseInt( req.body.miktar);
    var aydi=req.session.account[0].id;
    let sql=`UPDATE members SET coin='${yeniPara}' WHERE id = ${aydi}`;
    let query=db.query(sql,function(err,result){
        if(err){    console.log("update hata"); throw err;}
        else{console.log(result);res.send('update oldu');}

    });      
   
  });
  
  router.post('/paraCek',need.requireAuthentication,function(req, res, next) {
    var viewData = {
            success: null
          }
    
    if(req.session.account[0].coin>req.body.miktar){
      var yeniPara=parseInt(req.session.account[0].coin)-parseInt( req.body.miktar);
      var aydi=req.session.account[0].id;
      let sql=`UPDATE members SET coin='${yeniPara}' WHERE id = ${aydi}`;
      let query=db.query(sql,function(err,result){
        if(err){    console.log("update hata"); throw err;}
        else{console.log(result);res.send('update oldu');}

    });      
       
    }else{
        viewData.success = false;
    }
    
   
  });
module.exports = router;

