var express = require('express');
var router = express.Router();
var Member=require("../models/Members.js");
var need=require('./uretimZaman.js');

//ürün satmasayfası
router.get('/', need.requireAuthentication, function (req, res, next) {
    res.render('blank-page');
  });
//işlemleri
router.post('/',need.requireAuthentication,function(req, res, next) {
    var item=req.body.islem;
    var aydi=req.session.account._id;
    
    switch(item){
        case"milk":
                var sut=need.sellMilk(req.session.account.resources.milk);
                var yeniPara=req.session.account.resources.coin+sut;
                Member.findByIdAndUpdate(aydi,
                    {
                        'resources.coin':yeniPara,
                        'resources.milk':0,
                    },
                function(err,data){
                    if(err){res.send("süt sat  HATA"+err); throw err;}
                    else{
                        res.render('blank-page');
                       // res.json(data);
                    }        
                });
            break;
        case"egg":
                var yumurta=need.sellEgg(req.session.account.resources.egg);
                var yeniPara=yumurta+req.session.account.resources.coin;
                Member.findByIdAndUpdate(aydi,
                    {
                        'resources.coin':yeniPara,
                        'resources.egg':0,
                    },
                function(err,data){
                    if(err){res.send("egg sat HATA"+err); throw err;}
                    else{
                        res.render('blank-page');
                        //res.json(data);
                    }        
                });
            break;
        case"honey":
                var bal=need.sellSeed(req.session.account.resources.honey);
                var yeniPara=bal+req.session.account.resources.coin;
                Member.findByIdAndUpdate(aydi,
                    {
                        'resources.coin':yeniPara,
                        'resources.honey':0
                    },
                function(err,data){
                    if(err){res.send("bal sat HATA"+err); throw err;}
                    else{
                        res.render('blank-page');
                       // res.json(data);
                    }        
                });

            break;
        case"seed":
                var yem=need.sellSeed(req.session.account.resources.seed);
                var yeniPara=yem+req.session.account.resources.coin;
                Member.findByIdAndUpdate(aydi,
                    {
                        'resources.coin':yeniPara,
                        'resources.seed':0
                    },
                function(err,data){
                    if(err){res.send("yem sat hata"+err); throw err;}
                    else{            
                        res.render('blank-page');
                        //res.json(data);
                    }        
                });
            break;
        default:
                //res.json("item seçilmedi");
            break;
    }
  });
module.exports = router;

