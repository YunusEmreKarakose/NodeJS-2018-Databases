//kayit işlemleri
var express = require('express');
var router = express.Router();
var Member=require("../models/Members.js");
var need=require('./uretimZaman.js');

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
    var yeniPara=parseInt(req.session.account.resources.coin)+parseInt( req.body.miktar);
    var aydi=req.session.account._id;
    Member.findByIdAndUpdate(aydi,{'resources.coin':yeniPara},function(err,data){
        
        if(err){res.send("PARAYUKLE HATA"+err); throw err;}
        else{ 
            viewData.success = true;          
            res.send( { viewData: viewData });
        }        
    });
   
  });
  
  router.post('/paraCek',need.requireAuthentication,function(req, res, next) {
    var viewData = {
            success: null
          }
    var yeniPara=parseInt(req.session.account.resources.coin)-parseInt( req.body.miktar);
    var aydi=req.session.account._id;
    if(req.session.account.resources.coin>req.body.miktar){
      Member.findByIdAndUpdate(aydi,{'resources.coin':yeniPara},function(err,data){
        
        if(err){res.send("PARACEK HATA"+err); throw err;}
        else{    
            viewData.success = true;        
            res.send({ viewData: viewData });
        }        
    });  
    }else{
        viewData.success = false;
    }
    
   
  });
module.exports = router;

