//kayit işlemleri
var express = require('express');
var router = express.Router();
var Member=require("../models/Members.js");

router.post('/login', function(req, res, next) {
    var m=new Member({
        name: req.body.ad,
        surName: req.body.soyad,
        userName:req.body.kadi,       
        password: req.body.sifre,
        eMail:req.body.eposta,
        resources: {
            coin: 15,
            milk: 0,
            egg: 0,
            honey: 0,
            seed: 0,
            cow: [],
            chicken: [],
            bee: []
        }
    });
     m.save(function(err,data){
        if(err)res.send("kayıt hata"+err);
        res.redirect('/');
    });   
  });
module.exports = router;

